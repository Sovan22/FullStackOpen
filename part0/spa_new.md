```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    browser->>server: {"content":"rom rom","date":"2024-12-06T15:28:42.416Z"}
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server

```