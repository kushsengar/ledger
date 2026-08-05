package com.ledger.loan.repository;

import com.ledger.applicant.entity.Applicant;
import com.ledger.common.enums.LoanStatus;
import com.ledger.loan.entity.Loan;
import com.ledger.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByStatus(LoanStatus status);
    List<Loan> findByAssignedTo(User assignedTo);
    List<Loan> findByApplicant(Applicant applicant);
    Optional<Loan> findByApplicationNumber(String applicationNumber);
}
