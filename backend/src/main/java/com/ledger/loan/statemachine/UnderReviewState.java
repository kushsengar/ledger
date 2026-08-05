package com.ledger.loan.statemachine;

import com.ledger.common.enums.LoanStatus;
import com.ledger.common.enums.Role;
import com.ledger.common.exception.InsufficientAuthorityException;
import com.ledger.common.exception.InvalidStateTransitionException;
import com.ledger.loan.entity.Loan;
import com.ledger.user.entity.User;

import java.math.BigDecimal;

public class UnderReviewState implements LoanState {
    @Override
    public LoanStatus getStatus() { return LoanStatus.UNDER_REVIEW; }

    @Override
    public LoanState submit(Loan loan) { throw new InvalidStateTransitionException("Already under review"); }

    @Override
    public LoanState startReview(Loan loan, User reviewer) { throw new InvalidStateTransitionException("Already under review"); }

    @Override
    public LoanState approve(Loan loan, User approver) {
        checkAuthority(loan.getRequestedAmount(), approver);
        loan.setStatus(LoanStatus.APPROVED);
        return new ApprovedState();
    }

    @Override
    public LoanState reject(Loan loan, User rejector, String reason) {
        loan.setStatus(LoanStatus.REJECTED);
        return new RejectedState();
    }

    @Override
    public LoanState escalate(Loan loan, User escalator) {
        loan.setStatus(LoanStatus.ESCALATED);
        return new EscalatedState();
    }

    static void checkAuthority(BigDecimal amount, User user) {
        Role role = user.getRole();
        if (amount.compareTo(new BigDecimal("500000")) <= 0) {
            // LOAN_OFFICER or higher
            if (role == Role.APPLICANT) throw new InsufficientAuthorityException("Applicant cannot approve");
        } else if (amount.compareTo(new BigDecimal("2500000")) <= 0) {
            // BRANCH_MANAGER or higher
            if (role != Role.BRANCH_MANAGER && role != Role.CREDIT_RISK_OFFICER && role != Role.ADMIN) {
                throw new InsufficientAuthorityException("Branch Manager or higher required");
            }
        } else {
            // CREDIT_RISK_OFFICER required
            if (role != Role.CREDIT_RISK_OFFICER && role != Role.ADMIN) {
                throw new InsufficientAuthorityException("Credit Risk Officer required");
            }
        }
    }
}
