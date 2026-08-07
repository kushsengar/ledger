package com.ledger.loan.service;

import com.ledger.applicant.entity.Applicant;
import com.ledger.applicant.repository.ApplicantRepository;
import com.ledger.approval.entity.ApprovalStep;
import com.ledger.approval.repository.ApprovalStepRepository;
import com.ledger.audit.service.AuditService;
import com.ledger.common.enums.ApprovalAction;
import com.ledger.common.enums.LoanStatus;
import com.ledger.common.exception.ResourceNotFoundException;
import com.ledger.loan.dto.LoanApplicationRequest;
import com.ledger.loan.dto.LoanResponse;
import com.ledger.loan.entity.Loan;
import com.ledger.loan.repository.LoanRepository;
import com.ledger.loan.statemachine.LoanState;
import com.ledger.loan.statemachine.LoanStateFactory;
import com.ledger.user.entity.User;
import com.ledger.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoanService {
    private final LoanRepository loanRepository;
    private final ApplicantRepository applicantRepository;
    private final UserRepository userRepository;
    private final ApprovalStepRepository approvalStepRepository;
    private final AuditService auditService;

    @Transactional
    public LoanResponse createLoan(LoanApplicationRequest request, String username) {
        Applicant applicant = applicantRepository.findById(request.applicantId())
                .orElseThrow(() -> new ResourceNotFoundException("Applicant not found"));
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Loan loan = new Loan();
        loan.setApplicant(applicant);
        loan.setLoanType(request.loanType());
        loan.setRequestedAmount(request.requestedAmount());
        loan.setTenureMonths(request.tenureMonths());
        loan.setStatus(LoanStatus.DRAFT);
        
        String appNumber = "LED-" + LocalDateTime.now().getYear() + LocalDateTime.now().getMonthValue() + "-" + System.currentTimeMillis() % 100000;
        loan.setApplicationNumber(appNumber);
        
        loan = loanRepository.save(loan);
        auditService.logAction("LOAN", loan.getId(), "CREATED", username, "Loan created as DRAFT", "127.0.0.1");

        return mapToResponse(loan);
    }

    @Transactional
    public void submitForReview(Long loanId, String username) {
        Loan loan = getLoan(loanId);
        LoanState state = LoanStateFactory.getState(loan.getStatus());
        state.submit(loan);
        loanRepository.save(loan);
        auditService.logAction("LOAN", loan.getId(), "SUBMITTED", username, "Loan submitted", "127.0.0.1");
    }

    @Transactional
    public void startReview(Long loanId, String reviewerUsername) {
        Loan loan = getLoan(loanId);
        User reviewer = userRepository.findByUsername(reviewerUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        LoanState state = LoanStateFactory.getState(loan.getStatus());
        state.startReview(loan, reviewer);
        loanRepository.save(loan);
        auditService.logAction("LOAN", loan.getId(), "REVIEW_STARTED", reviewerUsername, "Review started", "127.0.0.1");
    }

    @Transactional
    public void approveLoan(Long loanId, String approverUsername, String comments) {
        Loan loan = getLoan(loanId);
        User approver = userRepository.findByUsername(approverUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        LoanState state = LoanStateFactory.getState(loan.getStatus());
        state.approve(loan, approver);
        loan.setApprovedAmount(loan.getRequestedAmount());
        
        saveApprovalStep(loan, approver, ApprovalAction.APPROVED, comments);
        loanRepository.save(loan);
        auditService.logAction("LOAN", loan.getId(), "APPROVED", approverUsername, "Loan approved: " + comments, "127.0.0.1");
    }

    @Transactional
    public void rejectLoan(Long loanId, String rejectorUsername, String reason) {
        Loan loan = getLoan(loanId);
        User rejector = userRepository.findByUsername(rejectorUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        LoanState state = LoanStateFactory.getState(loan.getStatus());
        state.reject(loan, rejector, reason);

        saveApprovalStep(loan, rejector, ApprovalAction.REJECTED, reason);
        loanRepository.save(loan);
        auditService.logAction("LOAN", loan.getId(), "REJECTED", rejectorUsername, "Loan rejected: " + reason, "127.0.0.1");
    }

    @Transactional
    public void escalateLoan(Long loanId, String escalatorUsername, String comments) {
        Loan loan = getLoan(loanId);
        User escalator = userRepository.findByUsername(escalatorUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        LoanState state = LoanStateFactory.getState(loan.getStatus());
        state.escalate(loan, escalator);

        saveApprovalStep(loan, escalator, ApprovalAction.ESCALATED, comments);
        loanRepository.save(loan);
        auditService.logAction("LOAN", loan.getId(), "ESCALATED", escalatorUsername, "Loan escalated: " + comments, "127.0.0.1");
    }

    private void saveApprovalStep(Loan loan, User actor, ApprovalAction action, String comments) {
        ApprovalStep step = new ApprovalStep();
        step.setLoan(loan);
        step.setActor(actor);
        step.setAction(action);
        step.setComments(comments);
        step.setRequiredRole(actor.getRole());
        step.setActionTimestamp(LocalDateTime.now());
        
        List<ApprovalStep> existingSteps = approvalStepRepository.findByLoanOrderByStepOrderAsc(loan);
        step.setStepOrder(existingSteps.size() + 1);
        approvalStepRepository.save(step);
    }

    public LoanResponse getLoanById(Long loanId) {
        return mapToResponse(getLoan(loanId));
    }

    public List<LoanResponse> getAllLoans() {
        return loanRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }
    
    public List<LoanResponse> getLoansByStatus(LoanStatus status) {
        return loanRepository.findByStatus(status).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<LoanResponse> getLoansAssignedToUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return loanRepository.findByAssignedTo(user).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private Loan getLoan(Long loanId) {
        return loanRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));
    }

    private LoanResponse mapToResponse(Loan loan) {
        com.ledger.applicant.dto.ApplicantResponse applicantDto = loan.getApplicant() != null ? new com.ledger.applicant.dto.ApplicantResponse(
                loan.getApplicant().getId(), loan.getApplicant().getFirstName(), loan.getApplicant().getLastName(),
                loan.getApplicant().getEmail(), loan.getApplicant().getPhone(), loan.getApplicant().getPanNumber(),
                loan.getApplicant().getDateOfBirth(), loan.getApplicant().getAddress(), loan.getApplicant().getEmploymentType(),
                loan.getApplicant().getAnnualIncome(), loan.getApplicant().getMonthlyDebt()
        ) : null;

        List<com.ledger.document.dto.DocumentResponse> documentDtos = loan.getDocuments().stream().map(d -> new com.ledger.document.dto.DocumentResponse(
                d.getId(), d.getDocumentType(), d.getFileName(), d.getFileSize(), d.getVerificationStatus(), d.getCreatedAt()
        )).collect(Collectors.toList());

        List<com.ledger.approval.dto.ApprovalStepResponse> stepDtos = loan.getApprovalSteps().stream().map(s -> new com.ledger.approval.dto.ApprovalStepResponse(
                s.getId(), s.getStepOrder(), s.getAction().name(), s.getActor().getUsername(), s.getComments(), s.getRequiredRole().name(), s.getActionTimestamp()
        )).collect(Collectors.toList());

        return new LoanResponse(
                loan.getId(),
                loan.getApplicationNumber(),
                applicantDto,
                loan.getLoanType(),
                loan.getRequestedAmount(),
                loan.getApprovedAmount(),
                loan.getTenureMonths(),
                loan.getInterestRate(),
                loan.getStatus(),
                loan.getRiskScore(),
                loan.getAssignedTo() != null ? loan.getAssignedTo().getUsername() : null,
                documentDtos,
                stepDtos,
                loan.getCreatedAt(),
                loan.getUpdatedAt()
        );
    }
}
