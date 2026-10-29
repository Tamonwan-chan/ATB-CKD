# Setting up the project on the MacBook (one time)

GitHub is the master copy. The OneDrive folder is now only a backup.

## 1. Retire the OneDrive copy

In Finder, rename the OneDrive project folder to `IV ATB CKD (old OneDrive backup)`.
Do not edit it any more, and do not delete it until the new setup has worked for a while.

## 2. Check git is installed

```bash
git --version
```

If macOS offers to install the Command Line Tools, click **Install** and run the command again.

## 3. Download both repos

Copy and paste this whole block into Terminal:

```bash
git clone https://github.com/Tamonwan-chan/ATB-CKD.git ~/Documents/ATB-CKD
cd ~/Documents/ATB-CKD
git clone https://github.com/Tamonwan-chan/ATB-CKD-references.git "IV ATB Renal Adjustment Resources"
open .
```

The private repo also holds the project instructions, memory and personal profile (`_private/`). Claude reads them from there.

The project is now in `~/Documents/ATB-CKD` (outside OneDrive, on purpose: OneDrive syncing git's hidden files can corrupt them).

**If Terminal asks for a GitHub password:** GitHub no longer accepts your account password there. Run this instead, choose GitHub.com → HTTPS → Login with a web browser, then repeat step 3:

```bash
brew install gh
gh auth login
```

(If `brew` is not found, install Homebrew from https://brew.sh first.)

## 4. Optional: keep your Mac Claude Code permissions

Drag `.claude/settings.local.json` from the old OneDrive folder into `~/Documents/ATB-CKD/.claude/`.
It is not stored in GitHub because it is specific to each computer.

## 5. Open it in VS Code

```bash
code ~/Documents/ATB-CKD
```

(If `code` is not found, open VS Code → File → Open Folder → `Documents/ATB-CKD`.)

---

# Every session, on any computer

Or just tell Claude "pull" at the start and "commit and push" at the end.

**Start — get the latest:**

```bash
cd ~/Documents/ATB-CKD
git pull
git -C "IV ATB Renal Adjustment Resources" pull
```

**Finish — save and publish:**

If you changed anything in `docs/` (the app), first open `docs/sw.js` and raise the number in
`const CACHE = 'renal-v1';` (v1 → v2 → v3 …). Phones that already opened the app keep their saved
copy until this name changes, so without it they keep showing the old doses.

```bash
cd ~/Documents/ATB-CKD
git add -A
git commit -m "Describe what you changed"
git push
```

Pushing a change to `docs/index.html` updates the live site (https://tamonwan-chan.github.io/ATB-CKD/) within about a minute for new visitors. Phones that already opened the app update only if you raised the `CACHE` number above.

**After adding a new reference PDF** to `IV ATB Renal Adjustment Resources/`:

```bash
cd ~/Documents/ATB-CKD/"IV ATB Renal Adjustment Resources"
git add -A
git commit -m "Add reference: <drug or document name>"
git push
```

The references repo is **private** (copyrighted UpToDate content). Never share it or move the PDFs into the public project folder.

**After changing the private project files** (`_private/CLAUDE.md`, `_private/MEMORY.md`): commit and push them in the references repo, as above.

---

# If you cloned before 29 Oct 2026

The public repo's history was rewritten on 29 Oct 2026 to remove private files. An older copy still holds them,
and pushing from it would put them back. On every computer that cloned before that date:

1. Copy out any work you have not pushed yet.
2. Delete the old `ATB-CKD` folder.
3. Run step 3 again.

