# The Music Club Website

A dynamic React + Vite website for The Music Club with:
- looping video background
- logo support
- Home, About, Events, Gallery, Team, Join sections
- event search and filtering
- gallery filtering and modal preview
- team filtering for Core and Junior Core
- local form submissions using browser localStorage
- responsive mobile navbar

## How to run in IntelliJ

1. Extract this folder.
2. Open the folder in IntelliJ IDEA.
3. Open the terminal inside IntelliJ.
4. Run:

```bash
npm install
npm run dev
```

5. Open the localhost URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Add your logo and background video

Place your uploaded files here:

```text
public/assets/tmc-logo.png
public/assets/tmc-bg-video.mp4
```

The code already points to these exact names.

## Add team photos

Put images here:

```text
public/assets/team/
```

Then edit the `team` array in:

```text
src/App.jsx
```

Example:

```js
{
  name: "Member Name",
  role: "General Secretary",
  group: "Core",
  domain: "Leadership",
  photo: "/assets/team/member-photo.jpg",
  bio: "Short bio here."
}
```

## Add gallery photos

Put images here:

```text
public/assets/gallery/
```

Then edit the `galleryItems` array in:

```text
src/App.jsx
```

## Notes

The join form is local only. It stores submissions in the browser's localStorage. For real public submissions, connect it to Firebase, Supabase, MongoDB, or your backend.
