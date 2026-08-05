package com.ledger.loan.statemachine;

import com.ledger.common.enums.LoanStatus;
import com.ledger.common.exception.InvalidStateTransitionException;
import com.ledger.loan.entity.Loan;
import com.ledger.user.entity.User;

public class EscalatedState implements LoanState {
    @Override
    public LoanStatus getStatus() { return LoanStatus.ESCALATED; }

    @Override
    public LoanState submit(Loan loan) { throw new InvalidStateTransitionException("Already escalated"); }

    @Override
    public LoanState startReview(Loan loan, User reviewer) { throw new InvalidStateTransitionException("Already escalated"); }

    @Override
    public LoanState approve(Loan loan, User approver) {
        UnderReviewState.checkAuthority(loan.getRequestedAmount(), approver);
        loan.setStatus(LoanStatus.APPROVED);
        return new ApprovedState();
    }

    @Override
    public LoanState reject(Loan loan, User rejector, String reason) {
        loan.setStatus(LoanStatus.REJECTED);
        return new RejectedState();
    }

    @Override
    public LoanState escalate(Loan loan, User escalator) { throw new InvalidStateTransitionException("Already escalated"); }
}
