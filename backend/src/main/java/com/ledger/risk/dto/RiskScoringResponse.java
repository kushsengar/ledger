package com.ledger.risk.dto;
import java.math.BigDecimal;
import java.util.List;
public record RiskScoringResponse(Integer score, String riskCategory, BigDecimal maxEligibleAmount, BigDecimal recommendedInterestRate, List<String> factors) {}
