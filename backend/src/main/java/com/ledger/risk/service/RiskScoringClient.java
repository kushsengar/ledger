package com.ledger.risk.service;

import com.ledger.risk.dto.RiskScoringRequest;
import com.ledger.risk.dto.RiskScoringResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Collections;

@Service
@RequiredArgsConstructor
@Slf4j
public class RiskScoringClient {
    private final RestTemplate restTemplate;

    @Value("${risk-scoring.base-url}")
    private String baseUrl;

    public RiskScoringResponse getRiskScore(RiskScoringRequest request) {
        try {
            return restTemplate.postForObject(baseUrl + "/api/v1/score", request, RiskScoringResponse.class);
        } catch (Exception e) {
            log.error("Risk scoring service failed, falling back to default", e);
            return new RiskScoringResponse(500, "MEDIUM_RISK", BigDecimal.ZERO, new BigDecimal("12.0"), Collections.emptyList());
        }
    }
}
