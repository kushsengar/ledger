package com.ledger.loan.dto;

import com.ledger.common.enums.LoanType;
import java.math.BigDecimal;

public record LoanApplicationRequest(Long applicantId, LoanType loanType, BigDecimal requestedAmount, Integer tenureMonths) {}
