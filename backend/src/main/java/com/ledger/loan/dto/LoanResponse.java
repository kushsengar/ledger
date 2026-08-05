package com.ledger.loan.dto;

import com.ledger.common.enums.LoanStatus;
import com.ledger.common.enums.LoanType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record LoanResponse(
        Long id,
        String applicationNumber,
        String applicantName,
        LoanType loanType,
        BigDecimal requestedAmount,
        BigDecimal approvedAmount,
        Integer tenureMonths,
        BigDecimal interestRate,
        LoanStatus status,
        Integer riskScore,
        String assignedToName,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
