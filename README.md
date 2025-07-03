# Lab-Demo
#Project Overview
==============================================================================================
The Medical Analysis Management Program is a desktop data management program for medical laboratories.
It helps manage medical data for each patient and their condition, the tests performed by the patient in the laboratory and their results.
It also stores the different types of tests available in the laboratory.
It works as a client-server program, and this program is considered the first version of the program.
----------------------------------------------------------------------------------------------
The project is a digital system used by lab technicians or doctors to register patient data, store test results,
and retrieve them later without re-entering patient information on every visit. The system also stores common
medical test types to streamline the work
==============================================================================================

## 🛠 Git Workflow (Feature Branch Workflow)

### 🔀 Branch Strategy

- `main`: The stable, primary branch contains the final product version. **Direct pushes to this branch are not permitted.**
- `dev`: The main development branch all feature branches are merged to this branch after review.

> ✅ Direct work on `main` or `dev` is strictly prohibited.

---

### 🌿 Feature Branches

Each new feature or part of the application is created in a separate branch with a clear name:

```bash(Create new feature)
git checkout dev
git pull
# ✨ إنشاء فيتشر جديدة
git checkout -b feature/<feature-name> dev


```merge the feature in dev:
# ✅ دمج الفيتشر في dev
git checkout dev
git pull
git merge feature/<feature-name>
# تأكد مفيش Conflicts
git push
