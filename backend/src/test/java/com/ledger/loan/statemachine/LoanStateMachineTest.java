package com.ledger.loan.statemachine;

import com.ledger.common.enums.LoanStatus;
import com.ledger.common.enums.Role;
import com.ledger.common.exception.InsufficientAuthorityException;
import com.ledger.common.exception.InvalidStateTransitionException;
import com.ledger.loan.entity.Loan;
import com.ledger.user.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class LoanStateMachineTest {

    private Loan loan;
    private User loanOfficer;
    private User branchManager;
    private User cro;

    @BeforeEach
    void setUp() {
        loan = new Loan();
        loan.setStatus(LoanStatus.DRAFT);
        loan.setRequestedAmount(new BigDecimal("100000"));

        loanOfficer = new User();
        loanOfficer.setUsername("officer1");
        loanOfficer.setRole(Role.LOAN_OFFICER);

        branchManager = new User();
        branchManager.setUsername("manager1");
        branchManager.setRole(Role.BRANCH_MANAGER);

        cro = new User();
        cro.setUsername("cro1");
        cro.setRole(Role.CREDIT_RISK_OFFICER);
    }

    @Test
    void testDraftToSubmitted() {
        LoanState state = LoanStateFactory.getState(LoanStatus.DRAFT);
        LoanState nextState = state.submit(loan);
        assertEquals(LoanStatus.SUBMITTED, nextState.getStatus());
    }

    @Test
    void testDraftApproveThrowsException() {
        LoanState state = LoanStateFactory.getState(LoanStatus.DRAFT);
        assertThrows(InvalidStateTransitionException.class, () -> state.approve(loan, loanOfficer));
    }

    @Test
    void testSubmittedToUnderReview() {
        LoanState state = LoanStateFactory.getState(LoanStatus.SUBMITTED);
        LoanState nextState = state.startReview(loan, loanOfficer);
        assertEquals(LoanStatus.UNDER_REVIEW, nextState.getStatus());
    }

    @Test
    void testUnderReviewApproveSmallAmountByLoanOfficer() {
        loan.setRequestedAmount(new BigDecimal("400000")); // < 500,000
        LoanState state = LoanStateFactory.getState(LoanStatus.UNDER_REVIEW);
        LoanState nextState = state.approve(loan, loanOfficer);
        assertEquals(LoanStatus.APPROVED, nextState.getStatus());
    }

    @Test
    void testUnderReviewApproveMediumAmountByLoanOfficerThrowsException() {
        loan.setRequestedAmount(new BigDecimal("600000")); // > 500,000
        LoanState state = LoanStateFactory.getState(LoanStatus.UNDER_REVIEW);
        assertThrows(InsufficientAuthorityException.class, () -> state.approve(loan, loanOfficer));
    }

    @Test
    void testUnderReviewApproveMediumAmountByBranchManager() {
        loan.setRequestedAmount(new BigDecimal("600000")); // <= 2,500,000
        LoanState state = LoanStateFactory.getState(LoanStatus.UNDER_REVIEW);
        LoanState nextState = state.approve(loan, branchManager);
        assertEquals(LoanStatus.APPROVED, nextState.getStatus());
    }

    @Test
    void testUnderReviewApproveLargeAmountByBranchManagerThrowsException() {
        loan.setRequestedAmount(new BigDecimal("3000000")); // > 2,500,000
        LoanState state = LoanStateFactory.getState(LoanStatus.UNDER_REVIEW);
        assertThrows(InsufficientAuthorityException.class, () -> state.approve(loan, branchManager));
    }

    @Test
    void testUnderReviewApproveLargeAmountByCRO() {
        loan.setRequestedAmount(new BigDecimal("3000000")); // > 2,500,000
        LoanState state = LoanStateFactory.getState(LoanStatus.UNDER_REVIEW);
        LoanState nextState = state.approve(loan, cro);
        assertEquals(LoanStatus.APPROVED, nextState.getStatus());
    }

    @Test
    void testUnderReviewReject() {
        LoanState state = LoanStateFactory.getState(LoanStatus.UNDER_REVIEW);
        LoanState nextState = state.reject(loan, loanOfficer, "Poor credit");
        assertEquals(LoanStatus.REJECTED, nextState.getStatus());
    }

    @Test
    void testUnderReviewEscalate() {
        LoanState state = LoanStateFactory.getState(LoanStatus.UNDER_REVIEW);
        LoanState nextState = state.escalate(loan, loanOfficer);
        assertEquals(LoanStatus.ESCALATED, nextState.getStatus());
    }
}
