package com.ledger.loan.statemachine;

import com.ledger.common.enums.LoanStatus;
import com.ledger.loan.entity.Loan;
import com.ledger.user.entity.User;

public interface LoanState {
    LoanStatus getStatus();
    LoanState submit(Loan loan);
    LoanState startReview(Loan loan, User reviewer);
    LoanState approve(Loan loan, User approver);
    LoanState reject(Loan loan, User rejector, String reason);
    LoanState escalate(Loan loan, User escalator);
}
