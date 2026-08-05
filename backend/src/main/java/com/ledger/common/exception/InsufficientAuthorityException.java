package com.ledger.common.exception;

public class InsufficientAuthorityException extends RuntimeException {
    public InsufficientAuthorityException(String message) {
        super(message);
    }
}
