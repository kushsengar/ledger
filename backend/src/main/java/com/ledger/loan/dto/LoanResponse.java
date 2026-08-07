package com.ledger.loan.dto;

import com.ledger.applicant.dto.ApplicantResponse;
import com.ledger.approval.dto.ApprovalStepResponse;
import com.ledger.common.enums.LoanStatus;
import com.ledger.common.enums.LoanType;
import com.ledger.document.dto.DocumentResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record LoanResponse(
        Long id,
        String applicationNumber,
        ApplicantResponse applicant,
        LoanType loanType,
        BigDecimal requestedAmount,
        BigDecimal approvedAmount,
        Integer tenureMonths,
        BigDecimal interestRate,
        LoanStatus status,
        Integer riskScore,
        String assignedToName,
        List<DocumentResponse> documents,
        List<ApprovalStepResponse> approvalSteps,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
