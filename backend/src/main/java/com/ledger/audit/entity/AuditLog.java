package com.ledger.audit.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String entityType;
    private Long entityId;
    private String action;
    private String actorUsername;

    @Column(columnDefinition = "TEXT")
    private String details;

    private String ipAddress;

    @Column(updatable = false)
    private LocalDateTime timestamp;
}
