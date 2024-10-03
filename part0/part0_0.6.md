sequenceDiagram single app save in exampleapp/spa

    #participant writing something into the text field
    participant writes in text field

    #participant clicking the Save button
    participant clicks the Save button
    browser adds dynamically { "content": text} to the page in a li node

    #the form is posted to /exampleapp/new_note_spa
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa with data list [{ "content": text, "date": "2023-1-1" }, ...]
    activate server
    server-->>browser: [{ message:"note created" }]
    deactivate server