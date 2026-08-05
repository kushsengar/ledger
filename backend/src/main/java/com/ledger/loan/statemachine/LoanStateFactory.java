package com.ledger.loan.statemachine;

import com.ledger.common.enums.LoanStatus;
import com.ledger.common.exception.InvalidStateTransitionException;

public class LoanStateFactory {
    public static LoanState getState(LoanStatus status) {
        return switch (status) {
            case DRAFT -> new DraftState();
            case SUBMITTED -> new SubmittedState();
            case UNDER_REVIEW -> new UnderReviewState();
            case APPROVED -> new ApprovedState();
            case REJECTED -> new RejectedState();
            case ESCALATED -> new EscalatedState();
            default -> throw new InvalidStateTransitionException("Unknown state: " + status);
        };
    }
}
