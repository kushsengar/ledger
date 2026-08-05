package com.ledger.loan.statemachine;

import com.ledger.common.enums.LoanStatus;
import com.ledger.common.exception.InvalidStateTransitionException;
import com.ledger.loan.entity.Loan;
import com.ledger.user.entity.User;

public class ApprovedState implements LoanState {
    @Override
    public LoanStatus getStatus() { return LoanStatus.APPROVED; }

    @Override
    public LoanState submit(Loan loan) { throw new InvalidStateTransitionException("Already approved"); }
    @Override
    public LoanState startReview(Loan loan, User reviewer) { throw new InvalidStateTransitionException("Already approved"); }
    @Override
    public LoanState approve(Loan loan, User approver) { throw new InvalidStateTransitionException("Already approved"); }
    @Override
    public LoanState reject(Loan loan, User rejector, String reason) { throw new InvalidStateTransitionException("Already approved"); }
    @Override
    public LoanState escalate(Loan loan, User escalator) { throw new InvalidStateTransitionException("Already approved"); }
}
