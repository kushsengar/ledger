package com.ledger.approval.dto;

import java.time.LocalDateTime;

public record ApprovalStepResponse(
    Long id,
    Integer stepOrder,
    String action,
    String actorUsername,
    String comments,
    String requiredRole,
    LocalDateTime actionTimestamp
) {}
