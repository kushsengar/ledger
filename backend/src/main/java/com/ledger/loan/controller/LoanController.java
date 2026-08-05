package com.ledger.loan.controller;

import com.ledger.common.enums.LoanStatus;
import com.ledger.loan.dto.ApprovalRequest;
import com.ledger.loan.dto.LoanApplicationRequest;
import com.ledger.loan.dto.LoanResponse;
import com.ledger.loan.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/loans")
@RequiredArgsConstructor
public class LoanController {
    private final LoanService loanService;

    @PostMapping
    public ResponseEntity<LoanResponse> createLoan(@RequestBody LoanApplicationRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(loanService.createLoan(request, username));
    }

    @GetMapping
    public ResponseEntity<List<LoanResponse>> getAllLoans(@RequestParam(required = false) LoanStatus status) {
        if (status != null) {
            return ResponseEntity.ok(loanService.getLoansByStatus(status));
        }
        return ResponseEntity.ok(loanService.getAllLoans());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanResponse> getLoanById(@PathVariable Long id) {
        return ResponseEntity.ok(loanService.getLoanById(id));
    }

    @PutMapping("/{id}/submit")
    public ResponseEntity<Void> submitForReview(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        loanService.submitForReview(id, username);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/review")
    public ResponseEntity<Void> startReview(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        loanService.startReview(id, username);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Void> approveLoan(@PathVariable Long id, @RequestBody ApprovalRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        loanService.approveLoan(id, username, request.comments());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Void> rejectLoan(@PathVariable Long id, @RequestBody ApprovalRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        loanService.rejectLoan(id, username, request.comments());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/escalate")
    public ResponseEntity<Void> escalateLoan(@PathVariable Long id, @RequestBody ApprovalRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        loanService.escalateLoan(id, username, request.comments());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my-queue")
    public ResponseEntity<List<LoanResponse>> getMyQueue() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(loanService.getLoansAssignedToUser(username));
    }
}
