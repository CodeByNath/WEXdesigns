# Foundation

Foundation is the durable repository-wide rule and invariant layer for the Studio/WEX repository, within the scope stated by each Foundation document. It provides a stable entrypoint for rules that must remain true across workstreams.

## Authority and scope

Foundation may establish durable repository-wide governing rules when separately authorised. Its possible subjects include Studio operating principles, ownership boundaries, integration rules, semantic-action principles, and AI-operability boundaries. This entrypoint does not itself establish the Studio operating model or AI-operability rules.

Foundation does not silently override accepted ADRs, WEX technical architecture, historical WEX authority, or verified implementation. Existing [architecture](../architecture/) remains the WEX technical and system architecture layer; [decisions](../decisions/) record accepted architectural decisions; current source remains implementation truth. Foundation links to those authorities rather than duplicating detailed technical contracts.

## Change rule

Create or change a Foundation rule only through authorised work. A proposal that changes architecture requires an ADR or other accepted authority decision before the Foundation text changes. Foundation documents must state their scope and link to the authorities they synthesize or constrain.

## Maintenance

The authorised owner of a Foundation change maintains its linked authority and scope. Reviewers verify that a Foundation change remains within its authority, does not duplicate technical contracts, and does not conflict with accepted decisions or verified implementation.

For repository navigation to demonstrated implementation, use the [Code Map](../code-map/README.md).
