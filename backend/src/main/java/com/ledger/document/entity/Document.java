package com.ledger.document.entity;

import com.ledger.common.BaseEntity;
import com.ledger.common.enums.DocumentType;
import com.ledger.common.enums.VerificationStatus;
import com.ledger.loan.entity.Loan;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "documents")
@Getter
@Setter
public class Document extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    private Loan loan;

    @Enumerated(EnumType.STRING)
    private DocumentType documentType;

    private String fileName;
    private String filePath;
    private String contentType;
    private Long fileSize;
    private String checksum;

    @Enumerated(EnumType.STRING)
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;
}
