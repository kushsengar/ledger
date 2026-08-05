package com.ledger.approval.repository;

import com.ledger.approval.entity.ApprovalStep;
import com.ledger.loan.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApprovalStepRepository extends JpaRepository<ApprovalStep, Long> {
    List<ApprovalStep> findByLoanOrderByStepOrderAsc(Loan loan);
}
