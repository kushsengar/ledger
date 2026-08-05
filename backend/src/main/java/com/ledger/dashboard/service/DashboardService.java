package com.ledger.dashboard.service;

import com.ledger.common.enums.LoanStatus;
import com.ledger.dashboard.dto.DashboardStats;
import com.ledger.loan.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final LoanRepository loanRepository;

    public DashboardStats getDashboardStats() {
        long total = loanRepository.count();
        long pending = loanRepository.findByStatus(LoanStatus.UNDER_REVIEW).size();
        long approved = loanRepository.findByStatus(LoanStatus.APPROVED).size();
        long rejected = loanRepository.findByStatus(LoanStatus.REJECTED).size();
        long escalated = loanRepository.findByStatus(LoanStatus.ESCALATED).size();

        double approvalRate = total > 0 ? (double) approved / total * 100 : 0;
        double rejectionRate = total > 0 ? (double) rejected / total * 100 : 0;

        return new DashboardStats(total, pending, approved, rejected, escalated, approvalRate, rejectionRate, 0.0);
    }
}
