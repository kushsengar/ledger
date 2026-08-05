package com.ledger.document.controller;

import com.ledger.common.enums.DocumentType;
import com.ledger.common.enums.VerificationStatus;
import com.ledger.document.entity.Document;
import com.ledger.document.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class DocumentController {
    private final DocumentService service;

    @PostMapping("/loans/{loanId}/documents")
    public ResponseEntity<Document> uploadDocument(
            @PathVariable Long loanId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("type") DocumentType type) {
        return ResponseEntity.ok(service.uploadDocument(loanId, file, type));
    }

    @GetMapping("/loans/{loanId}/documents")
    public ResponseEntity<List<Document>> listDocuments(@PathVariable Long loanId) {
        return ResponseEntity.ok(service.getDocumentsByLoan(loanId));
    }

    @GetMapping("/documents/{id}/download")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id) {
        Resource resource = service.downloadDocument(id);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PutMapping("/documents/{id}/verify")
    public ResponseEntity<Void> verifyDocument(@PathVariable Long id, @RequestParam VerificationStatus status) {
        service.verifyDocument(id, status);
        return ResponseEntity.ok().build();
    }
}
