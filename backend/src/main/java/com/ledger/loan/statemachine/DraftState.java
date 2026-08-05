package com.ledger.loan.statemachine;

import com.ledger.common.enums.LoanStatus;
import com.ledger.common.exception.InvalidStateTransitionException;
import com.ledger.loan.entity.Loan;
import com.ledger.user.entity.User;

public class DraftState implements LoanState {
    @Override
    public LoanStatus getStatus() { return LoanStatus.DRAFT; }

    @Override
    public LoanState submit(Loan loan) {
        loan.setStatus(LoanStatus.SUBMITTED);
        return new SubmittedState();
    }

    @Override
    public LoanState startReview(Loan loan, User reviewer) { throw new InvalidStateTransitionException("Cannot review draft"); }

    @Override
    public LoanState approve(Loan loan, User approver) { throw new InvalidStateTransitionException("Cannot approve draft"); }

    @Override
    public LoanState reject(Loan loan, User rejector, String reason) { throw new InvalidStateTransitionException("Cannot reject draft"); }

    @Override
    public LoanState escalate(Loan loan, User escalator) { throw new InvalidStateTransitionException("Cannot escalate draft"); }
}
