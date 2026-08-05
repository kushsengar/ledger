package com.ledger.risk.dto;
import java.math.BigDecimal;
public record RiskScoringRequest(BigDecimal annualIncome, BigDecimal monthlyDebt, Integer existingLoans, Integer employmentYears, BigDecimal loanAmount, Integer loanTenureMonths, String employmentType, Integer age) {}
