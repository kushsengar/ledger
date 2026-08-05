package com.ledger.audit.controller;

import com.ledger.audit.entity.AuditLog;
import com.ledger.audit.repository.AuditLogRepository;
import com.ledger.audit.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/audit")
@RequiredArgsConstructor
public class AuditController {
    private final AuditService service;
    private final AuditLogRepository repository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AuditLog>> getAuditTrail(@RequestParam String entityType, @RequestParam Long entityId) {
        return ResponseEntity.ok(service.getAuditTrail(entityType, entityId));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AuditLog>> getAllAuditLogs() {
        return ResponseEntity.ok(repository.findAll());
    }
}
