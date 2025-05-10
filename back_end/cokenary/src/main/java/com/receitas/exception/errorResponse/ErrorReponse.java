package com.receitas.exception.errorResponse;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorReponse {

    private int status;
    private String message;
    private Instant timeStamp;
    private String strackTrace;


    public String toJson() {
        return "{\n" +
                "    \"status\": " + this.status + ",\n" +
                "    \"message\": \"" + this.message + "\",\n" +
                "    \"timeStamp\": \"" + Instant.now() + "\"\n" +
                "}";
    }
    public ErrorReponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.timeStamp = Instant.now();
    }

    public ErrorReponse() {
    }


    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String mensagem) {
        this.message = mensagem;
    }

    public Instant getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Instant timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getStrackTrace() {
        return strackTrace;
    }

    public void setStrackTrace(String strackTrace) {
        this.strackTrace = strackTrace;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> eb4a1a3f139953775bb779a85dd1629c8f97a62f
