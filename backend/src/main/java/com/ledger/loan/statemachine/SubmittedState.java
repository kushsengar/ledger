package com.ledger.loan.statemachine;

import com.ledger.common.enums.LoanStatus;
import com.ledger.common.exception.InvalidStateTransitionException;
import com.ledger.loan.entity.Loan;
import com.ledger.user.entity.User;

public class SubmittedState implements LoanState {
    @Override
    public LoanStatus getStatus() { return LoanStatus.SUBMITTED; }

    @Override
    public LoanState submit(Loan loan) { throw new InvalidStateTransitionException("Already submitted"); }

    @Override
    public LoanState startReview(Loan loan, User reviewer) {
        loan.setStatus(LoanStatus.UNDER_REVIEW);
        loan.setAssignedTo(reviewer);
        return new UnderReviewState();
    }

    @Override
    public LoanState approve(Loan loan, User approver) { throw new InvalidStateTransitionException("Must start review first"); }

    @Override
    public LoanState reject(Loan loan, User rejector, String reason) { throw new InvalidStateTransitionException("Must start review first"); }

    @Override
    public LoanState escalate(Loan loan, User escalator) { throw new InvalidStateTransitionException("Must start review first"); }
}
