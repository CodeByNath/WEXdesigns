# Header Component

Status: DEFERRED
Phase: Header work paused for Identity Portability architecture correction

## Reviewer verdict

**Stop — architectural risk**

Owner clarified that the current central-PostgreSQL interpretation is not the intended WEX identity model.

WEX Identity is a **portable Plugin + Tool**. It identifies WEX shells/components inside each consuming system so they can be directly targeted, inspected, debugged and extended without traversing root CSS or the host application's internal tree.

The current accepted ADR 0013–0015 wording centralises allocation authority/storage in one Station and explicitly prevents host-local identity storage. That conflicts with Owner direction.

Header implementation is therefore deferred. Do not execute Phase 9C PostgreSQL bootstrap and do not begin Header shell implementation until the identity portability correction reaches its recorded resume gate.

The single active work area is now:

`project-work/identity-portability.md`

When that work explicitly authorises Header resumption, return to this same file. Do not create a replacement Header work file.
