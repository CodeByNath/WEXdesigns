# Adapter Source Boundary

The local-folder identity adapter owns only filesystem persistence, readback,
and atomicity for WEX-supplied records. It does not own WEX identity semantics
or host-domain data.

Framework-specific hooks do not belong in this core package.
