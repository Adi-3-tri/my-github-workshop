# Git &amp; GitHub Workshop — Participant Wall

A tiny static website (HTML + CSS + JavaScript, **no backend**) that shows a card for every
workshop participant. Each card pulls the photo from that person's GitHub profile and links
to it.

**Your task: add a card for yourself by opening a pull request.** 🎉

---

## 🚀 How to add yourself

### 1. Fork this repository

Click the **Fork** button at the top-right of this page. You now have your own copy.

### 2. Clone your fork

```bash
git clone https://github.com/<your-username>/github-workshop.git
cd github-workshop
```

### 3. Create a branch

```bash
git checkout -b add-<your-username>
```

### 4. Add your entry to `js/participants.js`

Open `js/participants.js` and paste this block **at the end of the list**, just before the
closing `];`:

```js
  ,{
    name: "Your Name",
    username: "your-github-username",
    description: "One short line about yourself.",
    skills: ["HTML", "CSS", "JavaScript"]
  },
```

| Field | Required | What it is |
|---|---|---|
| `name` | ✅ | Your display name on the card |
| `username` | ✅ | Your **GitHub username** — the photo and the card link come from this |
| `description` | optional | One or two lines about you |
| `skills` | optional | Up to 6 short tags |

You do **not** add a photo URL or a profile link — both are generated from `username`.

### 5. Check it looks right

Just open `index.html` in your browser (double-click it). Your card should appear at the
bottom of the grid. No install, no server, no build step.

### 6. Commit and push

```bash
git add js/participants.js
git commit -m "Add <Your Name> to participants"
git push origin add-<your-username>
```

### 7. Open the pull request

Go to your fork on GitHub → **Compare & pull request** → describe it briefly → **Create
pull request**. Once a maintainer merges it, your card is live on the site.

---

## ✅ Rules for your PR

- Only edit `js/participants.js`. Nothing else.
- Add **one** entry — yours.
- Never delete or edit someone else's entry.
- Keep the trailing comma `,` after your closing `}`.
- Keep it friendly and appropriate — PRs that don't will be closed.

## 🧯 Common mistakes

| Problem | Fix |
|---|---|
| Nothing shows up at all | A missing comma or brace broke the file. Open the browser console (`F12`) and look for a syntax error. |
| Card shows your initials instead of your photo | `username` is misspelled — it must match your GitHub username exactly. |
| Merge conflict in your PR | Everyone edits the same file. Pull the latest `main` into your branch and re-add your block at the end. |

Updating your branch after others' PRs get merged:

```bash
git remote add upstream https://github.com/<maintainer>/github-workshop.git
git fetch upstream
git rebase upstream/main
# fix any conflict in js/participants.js, then:
git push --force-with-lease origin add-<your-username>
```

---

## 📁 Project structure

```
github-workshop/
├── index.html            # Page markup
├── css/style.css         # All styling (light + dark theme)
├── js/participants.js    # 👈 THE ONLY FILE YOU EDIT — the data
└── js/main.js            # Renders the cards, search, theme toggle
```

## 🖥️ Running it locally

Open `index.html` directly in a browser. That's it — everything is plain static files.

## 🌐 Publishing (maintainer)

**Settings → Pages → Build and deployment → Deploy from a branch → `main` / `/ (root)`.**
The site is then live at `https://<maintainer>.github.io/github-workshop/`.
