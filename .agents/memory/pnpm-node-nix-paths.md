---
name: Pnpm/Node workflow setup
description: How to configure workflows in this project when node/pnpm are not in PATH by default
---

## The Problem

The workflow shell does not have `node` or `pnpm` in PATH. The `.replit` `modules = ["nodejs-20"]` is set, but the nix profile is not sourced in workflow shells.

## The Fix

Use full nix store paths in workflow commands:

- **node**: `/nix/store/1lagpgadaybvs1n2312gysg2phjk89y8-nodejs-20.20.0-wrapped/bin/node`
- **node bin dir**: `/nix/store/1lagpgadaybvs1n2312gysg2phjk89y8-nodejs-20.20.0-wrapped/bin`
- **pnpm**: `/nix/store/61lr9izijvg30pcribjdxgjxvh3bysp4-pnpm-10.26.1/bin/pnpm`

## Required flags

- `pnpm install` needs `--force` in the workflow shell to avoid an interactive prompt about recreating the modules directory.

## packageManager field

`package.json` had `packageManager: pnpm@10.33.0` but only pnpm 10.26.1 is in the nix store. Updated to `pnpm@10.26.1` to prevent self-upgrade failure (ENOENT: pnpm).

**Why:** pnpm tries to self-upgrade to the version in `packageManager` field by spawning `pnpm add pnpm@X.Y.Z`, but `pnpm` is not in PATH so it fails with ENOENT.

**How to apply:** Whenever configuring a workflow command or running pnpm in this project, use the full nix paths above and add `--force` to `pnpm install`.
