package com.ledger.document.dto;

import com.ledger.common.enums.DocumentType;
import com.ledger.common.enums.VerificationStatus;
import java.time.LocalDateTime;

public record DocumentResponse(
    Long id,
    DocumentType documentType,
    String fileName,
    Long fileSize,
    VerificationStatus verificationStatus,
    LocalDateTime createdAt
) {}
