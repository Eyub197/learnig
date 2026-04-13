const sanitized = DOMPurify.sanitize("<img src=x onerror=alert(1)>");
const sanitizedTwo = DOMPurify.sanitize("<svg><g/onload=alert(2)></svgi>");
const sanitizedThree = DOMPurify.sanitize(
  "<iframe src=jAva&Tab;script:alert(3)><iframe>",
);
console.log(sanitizedThree);
