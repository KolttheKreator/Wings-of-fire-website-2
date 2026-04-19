console.log("script loaded");
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://cvjkxmgfiaoetepwfyqi.supabase.co";
const supabaseKey = "sb_publishable_92kz51al3ZuihOY047N5Gw_zRqOGQ2v";
const supabase = createClient(supabaseUrl, supabaseKey);

const feed = document.getElementById("feed");
const postBtn = document.getElementById("postBtn");
const postText = document.getElementById("postText");
const postDescription = document.getElementById("postDescription");
const template = document.getElementById("postTemplate");
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const sortSelect = document.getElementById("sortSelect");
const notifCount = document.getElementById("notifCount");
const mentionList = document.getElementById("mentionList");

const notifBtn = document.getElementById("notifBtn");
const notifModal = document.getElementById("notifModal");
const notifBackdrop = document.getElementById("notifBackdrop");
const closeNotifBtn = document.getElementById("closeNotifBtn");
const notifList = document.getElementById("notifList");

const topAvatar = document.getElementById("topAvatar");
const postAvatar = document.getElementById("postAvatar");
const editCommentModal = document.getElementById("editCommentModal");
const editCommentBackdrop = document.getElementById("editCommentBackdrop");
const closeEditCommentBtn = document.getElementById("closeEditCommentBtn");
const editCommentInput = document.getElementById("editCommentInput");
const saveEditCommentBtn = document.getElementById("saveEditCommentBtn");
const bioModal = document.getElementById("bioModal");
const bioBackdrop = document.getElementById("bioBackdrop");
const closeBioBtn = document.getElementById("closeBioBtn");
const bioAvatar = document.getElementById("bioAvatar");
const bioName = document.getElementById("bioName");
const bioRole = document.getElementById("bioRole");
const bioText = document.getElementById("bioText");
const bioLikes = document.getElementById("bioLikes");
const bioTag = document.getElementById("bioTag");

const profileEditorModal = document.getElementById("profileEditorModal");
const profileEditorBackdrop = document.getElementById("profileEditorBackdrop");
const closeProfileEditorBtn = document.getElementById("closeProfileEditorBtn");
const editorPreviewAvatar = document.getElementById("editorPreviewAvatar");
const profilePicInput = document.getElementById("profilePicInput");
const profilePicName = document.getElementById("profilePicName");
const editRoleInput = document.getElementById("editRoleInput");
const editBioInput = document.getElementById("editBioInput");
const editLikesInput = document.getElementById("editLikesInput");
const editTagInput = document.getElementById("editTagInput");
const saveProfileBtn = document.getElementById("saveProfileBtn");

const loginScreen = document.getElementById("loginScreen");
const keywordInput = document.getElementById("keywordInput");
const loginKeywordBtn = document.getElementById("loginKeywordBtn");
const loginMessage = document.getElementById("loginMessage");
const logoutBtn = document.getElementById("logoutBtn");

const postViewModal = document.getElementById("postViewModal");
const postViewBackdrop = document.getElementById("postViewBackdrop");
const closePostViewBtn = document.getElementById("closePostViewBtn");
const postViewImage = document.getElementById("postViewImage");
const postViewAvatar = document.getElementById("postViewAvatar");
const postViewUsername = document.getElementById("postViewUsername");
const postViewTime = document.getElementById("postViewTime");
const postViewTitle = document.getElementById("postViewTitle");
const postViewDescription = document.getElementById("postViewDescription");
const postViewComments = document.getElementById("postViewComments");
const postViewCommentInput = document.getElementById("postViewCommentInput");
const postViewCommentBtn = document.getElementById("postViewCommentBtn");
const threadOverlay = document.getElementById("threadOverlay");
const threadBackdrop = document.getElementById("threadBackdrop");
const threadPanel = document.getElementById("threadPanel");
const closeThreadBtn = document.getElementById("closeThreadBtn");
const threadTitle = document.getElementById("threadTitle");
const threadSubtitle = document.getElementById("threadSubtitle");
const threadComments = document.getElementById("threadComments");
const threadReplyInput = document.getElementById("threadReplyInput");
const threadReplyBtn = document.getElementById("threadReplyBtn");
const threadPostMiniAvatar = document.getElementById("threadPostMiniAvatar");
let editingCommentPostId = null;
let editingCommentId = null;
let editingReplyId = null;
let activeThreadCommentId = null;
let currentUser = null;
let activeThreadPostId = null;
let editingPostId = null;
let selectedImageData = "";
let activePostId = null;
let posts = [];

const profileKeywords = {
  kraken: "@Kolt",
  wing: "@Jay",
  nova: "@Nova",
  sketch: "@Aanya",
  sugar: "@Savannah",
  funny: "@Olivia",
  chaos: "@Wyatt",
  loki: "@Cathy",
  rumi: "@Kaiju",
  cool: "@Cae",
  blunt: "@Kadence",
  duck: "@Donnie",
  skin: "@Alexei",
  ded: "@Sabrina",
  ghost: "@Sarah",
  revived: "@Deirdre"


 
};

const bios = {
  "@Kolt": {
    letter: "K",
    role: "Founder",
    bio: "Builder of dragon chaos, game ideas, and community vibes.",
    likes: "Dragons, coding, builds",
    tag: "Creator",
    image: ""
  },
  "@Aanya": {
    letter: "A",
    role: "Master Sketcher", 
    bio: "Very good at sketching. Super fun to speak with.",
    likes: "Sketching, dragons, lore, chatting",
    tag: "Artist",
    image: ""
  },
  "@Savannah": {
    letter: "S",
    role: "Sugar Rush Queen",
    bio: "Always on a sugar rush. Christian. I disagree with her (This Bio has been written by Coding_Crow or Wyatt. AND YOU CAN'T DO ANYTHING ABOUT IT MUAHAHAHA)",
    likes: "OCs, roleplay, chaos",
    tag: "SUGAR RUSH",
    image: ""
  },
  "@Olivia": {
    letter: "O",
    role: "OC maker",
    bio: "Chugs out cool ideas like a robot",
    likes: "OCs, RP, fun",
    tag: "Da funny",
    image: ""
  },
  "@Wyatt": {
    letter: "W",
    role: "General Annoyance",
    bio: "I helped make this site!",
    likes: "CHAOS",
    tag: "The crazy one",
    image: ""
  },
  "@Cathy": {
    letter: "C",
    role: "Smart One",
    bio: "The smart one. Also called Lokidottir, much to   her annoyance.",
    likes: "Debating",
    tag: "The Lokidottir",   
    image: ""
  },
  "@Kaiju": {
    letter: "K",
    role: "Le Kaiju",
    bio: "The crazy one, THE KAIJU, QUEEN OF THE TERRORS!!",
    likes: "Coding_Crow Wyatt, art, Kolt",
    tag: "KAIJU",
    image: ""
  }, 
  "@Cae": {
    letter: "C",
    role: "Quiet Nice Kid",
    bio: "Loves doing art, RPing, and making OCs",
    likes: "Art",
    tag: "Quiet Guy",
    image: ""
  },
  "@Kadence": {
    letter: "KK",
    role: "The Blunt",
    bio: "Blunt lil banana",
    likes: "OCs",
    tag: "Blunt",
    image: ""
  },
  "@Sarah": {
    letter: "S",
    role: "Yapper",
    bio: "Sister to the Duck Snake, presenting... THE YAPPER!!",
    likes: "art, yapping",
    tag: "yapper",
    image: ""
  },
  "@Deirdre": {
    letter: "D",
    role: "The legend!",
    bio: "The woman, the myth, the legend, HUFFLEPUFF DEIRDRE!!!!",
    likes: "DL, everyone in DL, Art",
    tag: "EEEEEEEEEEEEEEEEEEEEEEEEEEEE SO HAPPY",
    image: ""
  },
  "@Donnie": {
    letter: "DD",
    role: "The Duck Snake",
    bio: "THE GREAT DUCK SNAKE",
    likes: "Funny stuff",
    tag: "Duck Snake",
    image: ""
  },
  "@Alexei": {
    letter: "AA",
    role: "He/They",
    bio: "The rarely-seen author",
    likes: "Writing",
    tag: "Author",
    image: ""
  },
  "@Sabrina": {
    letter: "S",
    role: "The dead one",
    bio: "The one in the graveyard. Actually, why the heck am I making a profile for her?",
    likes: "Being Dead",
    tag: "Ded",
    image: ""
  }
};


const users = Object.keys(bios);

function saveLocalData() {
  try {
    localStorage.setItem("dragon_bios", JSON.stringify(bios));
    localStorage.setItem("dragon_currentUser", currentUser || "");
  } catch (error) {
    console.error("Could not save local data:", error);
  }
}

function loadLocalData() {
  try {
    const savedBios = localStorage.getItem("dragon_bios");
    const savedCurrentUser = localStorage.getItem("dragon_currentUser");

    if (savedBios) {
      const parsedBios = JSON.parse(savedBios);
      if (parsedBios && typeof parsedBios === "object") {
        Object.keys(parsedBios).forEach((key) => {
          bios[key] = parsedBios[key];
        });
      }
    }

    if (savedCurrentUser) {
      currentUser = savedCurrentUser;
    }
  } catch (error) {
    console.error("Could not load local data:", error);
  }
}





function closeNotifications() {
  if (notifModal) {
    notifModal.classList.add("hidden");
  }
}









function formatTime(createdAt) {
  const timeValue =
    typeof createdAt === "string" ? new Date(createdAt).getTime() : Number(createdAt);

  const mins = Math.floor((Date.now() - timeValue) / 60000);

  if (mins < 1) return "just now";
  if (mins === 1) return "1 minute ago";
  if (mins < 60) return `${mins} minutes ago`;

  const hours = Math.floor(mins / 60);
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function highlightMentions(text) {
  return String(text || "").replace(/(@[a-zA-Z0-9_]+)/g, '<span class="mention">$1</span>');
}

function getSortedPosts() {
  const mode = sortSelect ? sortSelect.value : "recent";
  const sorted = [...posts];

  if (mode === "liked") {
    sorted.sort((a, b) => b.likes - a.likes);
  } else if (mode === "comments") {
    sorted.sort((a, b) => b.comments.length - a.comments.length);
  } else {
    sorted.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.createdAt - a.createdAt;
    });
  }

  return sorted;
}

function showLoginScreen() {
  if (loginScreen) loginScreen.style.display = "flex";
}

function hideLoginScreen() {
  if (loginScreen) loginScreen.style.display = "none";
}

async function signInWithKeyword() {
  const keyword = keywordInput ? keywordInput.value.trim().toLowerCase() : "";

  if (!keyword) {
    if (loginMessage) loginMessage.textContent = "Enter a keyword first.";
    return;
  }

  const matchedUser = profileKeywords[keyword];

  if (!matchedUser) {
    if (loginMessage) loginMessage.textContent = "Wrong keyword.";
    return;
  }

  currentUser = matchedUser;
  subscribeToNotificationChanges();
  saveLocalData();
  hideLoginScreen();
  refreshMainProfileUI();
  await updateNotificationCount();
  await loadPostsFromSupabase();

  if (loginMessage) loginMessage.textContent = "";
  if (keywordInput) keywordInput.value = "";
}

function logout() {
  currentUser = null;
  localStorage.removeItem("dragon_currentUser");

  closeBio();
  closeProfileEditor();
  closePostView();
  closeNotifications();

  if (keywordInput) keywordInput.value = "";
  if (loginMessage) loginMessage.textContent = "";

  showLoginScreen();
}

function setProfileImage(imageSrc) {
  if (!currentUser || !bios[currentUser]) return;
  bios[currentUser].image = imageSrc;
  refreshMainProfileUI();
}

function refreshMainProfileUI() {
  if (!currentUser || !bios[currentUser]) return;

  const myBio = bios[currentUser];

  if (topAvatar) {
    if (myBio.image) {
      topAvatar.innerHTML = `<img src="${myBio.image}" alt="Profile picture">`;
    } else {
      topAvatar.innerHTML = `<span id="topAvatarLetter">${myBio.letter || "?"}</span>`;
    }
  }

  if (postAvatar) {
    if (myBio.image) {
      postAvatar.innerHTML = `<img src="${myBio.image}" alt="Profile picture">`;
    } else {
      postAvatar.innerHTML = `<span id="postAvatarLetter">${myBio.letter || "?"}</span>`;
    }
  }

  if (editorPreviewAvatar) {
    if (myBio.image) {
      editorPreviewAvatar.innerHTML = `<img src="${myBio.image}" alt="Profile picture">`;
    } else {
      editorPreviewAvatar.textContent = myBio.letter || "?";
    }
  }
}

function openBio(usernameText) {
  const bio = bios[usernameText];
  if (!bio) return;

  if (bioAvatar) {
    if (bio.image) {
      bioAvatar.innerHTML = `<img src="${bio.image}" alt="Profile picture">`;
    } else {
      bioAvatar.textContent = bio.letter;
    }
  }

  if (bioName) bioName.textContent = usernameText;
  if (bioRole) bioRole.textContent = bio.role;
  if (bioText) bioText.textContent = bio.bio;
  if (bioLikes) bioLikes.textContent = `Likes: ${bio.likes}`;
  if (bioTag) bioTag.textContent = `Tag: ${bio.tag}`;

  if (bioModal) bioModal.classList.remove("hidden");
}

function closeBio() {
  if (bioModal) bioModal.classList.add("hidden");
}

function openProfileEditor() {
  if (!currentUser || !bios[currentUser]) return;

  const myBio = bios[currentUser];

  if (editRoleInput) editRoleInput.value = myBio.role;
  if (editBioInput) editBioInput.value = myBio.bio;
  if (editLikesInput) editLikesInput.value = myBio.likes;
  if (editTagInput) editTagInput.value = myBio.tag;
  if (profilePicName) profilePicName.textContent = myBio.image ? "Profile pic selected" : "No profile pic chosen";

  if (editorPreviewAvatar) {
    if (myBio.image) {
      editorPreviewAvatar.innerHTML = `<img src="${myBio.image}" alt="Profile picture">`;
    } else {
      editorPreviewAvatar.textContent = myBio.letter;
    }
  }

  if (profileEditorModal) profileEditorModal.classList.remove("hidden");
}

function closeProfileEditor() {
  if (profileEditorModal) profileEditorModal.classList.add("hidden");
}

function showMentionList(filter = "") {
  if (!mentionList) return;

  mentionList.innerHTML = "";

  const filtered = users.filter((user) =>
    user.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    mentionList.classList.add("hidden");
    return;
  }

  filtered.forEach((user) => {
    const div = document.createElement("div");
    div.className = "mention-item";
    div.textContent = user;
    div.onclick = function () {
      insertMention(user);
    };
    mentionList.appendChild(div);
  });

  mentionList.classList.remove("hidden");
}

function insertMention(user) {
  if (!postText) return;

  const text = postText.value;
  const cursorPos = postText.selectionStart;
  const before = text.slice(0, cursorPos);
  const after = text.slice(cursorPos);

  const newBefore = before.replace(/@\w*$/, user);
  postText.value = newBefore + " " + after;

  if (mentionList) mentionList.classList.add("hidden");

  postText.focus();

  const newCursorPos = (newBefore + " ").length;
  postText.setSelectionRange(newCursorPos, newCursorPos);
}

function openPostView(post) {
  activePostId = post.id;

  if (postViewImage) {
    if (post.image) {
      postViewImage.src = post.image;
      postViewImage.style.display = "block";
    } else {
      postViewImage.style.display = "none";
    }
  }

  const bio = bios[post.username];

  if (postViewAvatar) {
    if (bio && bio.image) {
      postViewAvatar.innerHTML = `<img src="${bio.image}" alt="Profile picture">`;
    } else {
      postViewAvatar.textContent = bio?.letter || post.userLetter || "?";
    }
  }

  if (postViewUsername) postViewUsername.textContent = post.username;
  if (postViewTime) postViewTime.textContent = formatTime(post.createdAt);
  if (postViewTitle) postViewTitle.textContent = String(post.text || "");
  if (postViewDescription) postViewDescription.textContent = String(post.description || "");

  if (postViewComments) {
  postViewComments.innerHTML = "";

  post.comments.forEach((comment) => {
    const card = document.createElement("div");
    card.className = "comment-thread-card";

    const replyCount = Array.isArray(comment.replies) ? comment.replies.length : 0;
    const avatarLetter = bios[comment.user]?.letter || comment.user?.[1] || "?";

    card.innerHTML = `
      <div class="comment-thread-top">
        <div class="comment-thread-avatar">${avatarLetter}</div>
        <div>
          <div class="comment-thread-user">${comment.user}</div>
          <div class="comment-thread-time">${comment.created_at ? formatTime(comment.created_at) : ""}</div>
        </div>
      </div>

      <div class="comment-thread-text">${highlightMentions(comment.text || "")}</div>
      <div class="comment-thread-meta">${replyCount} repl${replyCount === 1 ? "y" : "ies"} • Open thread</div>
    `;
    if (comment.user === currentUser) {
  const editCommentBtn = document.createElement("button");
  editCommentBtn.type = "button";
  editCommentBtn.className = "action-btn edit-btn";
  editCommentBtn.textContent = "✏️ Edit";

  editCommentBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    editTopLevelComment(post.id, comment.id);
  });

  card.appendChild(editCommentBtn);
}

    card.addEventListener("click", function () {
      openThreadPanel(post.id, comment.id);
    });
    

    postViewComments.appendChild(card);
  });
}

  if (postViewCommentInput) {
    postViewCommentInput.value = "";
  }

  if (postViewModal) {
    postViewModal.classList.remove("hidden");
  }

  document.body.classList.add("modal-open");
}

function closePostView() {
  activePostId = null;

  if (postViewModal) {
    postViewModal.classList.add("hidden");
  }

  document.body.classList.remove("modal-open");
}

async function loadPostsFromSupabase() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not load posts:", error.message);
    return;
  }

  posts = (data || []).map((post) => ({
    id: post.id,
    username: post.username,
    userLetter: post.user_letter || "",
    text: post.text,
    description: post.description || "",
    image: post.image || "",
    likes: post.likes || 0,
    comments: Array.isArray(post.comments) ? post.comments : [],
    pinned: !!post.pinned,
    createdAt: Number(post.created_at) || Date.now()
  }));

  renderPosts();
}
async function addNotification(targetUser, message, postId = null, type = "general") {
  if (!targetUser) return;

  const { error } = await supabase.from("notifications").insert({
    target_user: targetUser,
    actor_user: currentUser,
    text: message,
    post_id: postId,
    type: type,
    read: false,
    created_at: Date.now()
  });

  if (error) {
    console.error("Could not add notification:", error.message);
    return;
  }

  if (currentUser === targetUser) {
    await updateNotificationCount();
  }
}

async function getCurrentUserNotifications() {
  if (!currentUser) return [];

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("target_user", currentUser)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not load notifications:", error.message);
    return [];
  }

  return data || [];
}
async function updateNotificationCount() {
  if (!notifCount || !currentUser) return;

  const { data, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: false })
    .eq("target_user", currentUser)
    .eq("read", false);

  if (error) {
    console.error("Could not count notifications:", error.message);
    notifCount.textContent = "0";
    return;
  }

  notifCount.textContent = data ? String(data.length) : "0";
}

async function openNotifications() {
  if (!notifModal || !notifList) return;

  const myNotifications = await getCurrentUserNotifications();
  notifList.innerHTML = "";

  if (myNotifications.length === 0) {
    const empty = document.createElement("div");
    empty.className = "comment";
    empty.textContent = "No notifications yet.";
    notifList.appendChild(empty);
  } else {
    myNotifications.forEach((notif) => {
      const div = document.createElement("button");
      div.type = "button";
      div.className = "comment notif-item";
      div.style.cursor = notif.post_id ? "pointer" : "default";
      div.style.border = "none";
      div.style.width = "100%";
      div.style.textAlign = "left";
      div.style.background = "#f9fafb";
      div.style.padding = "12px 14px 12px 18px";
      div.style.position = "relative";
      div.style.overflow = "hidden";
      div.style.borderRadius = "14px";

      if (!notif.read) {
        const marker = document.createElement("span");
        marker.style.position = "absolute";
        marker.style.left = "0";
        marker.style.top = "0";
        marker.style.bottom = "0";
        marker.style.width = "4px";
        marker.style.background = "#7c3aed";
        marker.style.pointerEvents = "none";
        div.appendChild(marker);
      }

      const text = document.createElement("div");
      text.textContent = notif.text;

      const time = document.createElement("div");
      time.style.fontSize = "12px";
      time.style.opacity = "0.7";
      time.style.marginTop = "4px";
      time.textContent = formatTime(notif.created_at);

      div.appendChild(text);
      div.appendChild(time);

      div.addEventListener("click", async function (e) {
        e.stopPropagation();

        if (notif.post_id) {
          await openNotificationTarget(notif.id);
        } else {
          await markNotificationAsRead(notif.id);
          closeNotifications();
        }
      });

      notifList.appendChild(div);
    });
  }

  notifModal.classList.remove("hidden");
}

async function markNotificationAsRead(notificationId) {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId);

  if (error) {
    console.error("Could not mark notification as read:", error.message);
    return;
  }

  await updateNotificationCount();
}
async function openNotificationTarget(notificationId) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("id", notificationId)
    .single();

  if (error || !data) {
    console.error("Could not load notification target:", error?.message);
    return;
  }

  await markNotificationAsRead(notificationId);
  closeNotifications();

  if (!data.post_id) return;

  const targetPost = posts.find((p) => String(p.id) === String(data.post_id));
  if (!targetPost) {
    alert("That post could not be found.");
    return;
  }

  openPostView(targetPost);
}


async function addPostToSupabase(newPost) {
  const { error } = await supabase.from("posts").insert({
    username: newPost.username,
    user_letter: newPost.userLetter,
    text: newPost.text,
    description: newPost.description,
    image: newPost.image,
    likes: newPost.likes,
    comments: newPost.comments,
    pinned: newPost.pinned,
    created_at: newPost.createdAt
  });

  if (error) {
    console.error("Could not save post:", error.message);
    alert("Could not save post.");
    return false;
  }

  return true;
}

async function updatePostInSupabase(postId, updates) {
  const { error } = await supabase
    .from("posts")
    .update(updates)
    .eq("id", postId);

  if (error) {
    console.error("Could not update post:", error.message);
    alert("Could not update post.");
    return false;
  }

  return true;
}

async function deletePostFromSupabase(postId) {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (error) {
    console.error("Could not delete post:", error.message);
    alert("Could not delete post.");
    return false;
  }

  return true;
}
function shouldNotifyForPost(post, actingUser) {
  if (!currentUser) return false;

  // don't notify yourself
  if (post.username === actingUser) return false;

  // notify if it's your post
  if (post.username === currentUser) return true;

  // notify if you've already commented on it before
  const iAlreadyCommented = post.comments.some(
    (comment) => comment.user === currentUser
  );

  return iAlreadyCommented;
}
async function submitPostViewComment() {
  if (!activePostId || !currentUser || !postViewCommentInput) return;

  const text = postViewCommentInput.value.trim();
  if (!text) return;

  const post = posts.find((p) => p.id === activePostId);
  if (!post) return;

  const updatedComments = [
  ...post.comments,
  {
    id: crypto.randomUUID(),
    user: currentUser,
    text: text,
    created_at: Date.now(),
    replies: []   // 👈 THIS is the magic
  }
];

  const ok = await updatePostInSupabase(post.id, {
    comments: updatedComments
  });

  if (!ok) return;

  if (post.username !== currentUser) {
    await addNotification(
      post.username,
      `${currentUser} commented on your post`,
      post.id,
      "comment"
    );
  }

  const notifiedUsers = new Set();

  for (const comment of post.comments) {
    if (
      comment.user !== currentUser &&
      comment.user !== post.username &&
      !notifiedUsers.has(comment.user)
    ) {
      await addNotification(
        comment.user,
        `${currentUser} also commented on a post you're in`,
        post.id,
        "comment"
      );
      notifiedUsers.add(comment.user);
    }
  }

  saveLocalData();
  await loadPostsFromSupabase();
  await updateNotificationCount();

  const updatedPost = posts.find((p) => p.id === activePostId);
  if (updatedPost) {
    openPostView(updatedPost);
  }
}
let notificationsChannel = null;

function subscribeToNotificationChanges() {
  if (notificationsChannel || !currentUser) return;

  notificationsChannel = supabase
    .channel("public-notifications-live")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "notifications"
      },
      async (payload) => {
        const newRow = payload.new;
        const oldRow = payload.old;

        if (
          (newRow && newRow.target_user === currentUser) ||
          (oldRow && oldRow.target_user === currentUser)
        ) {
          await updateNotificationCount();
        }
      }
    )
    .subscribe((status) => {
      console.log("Notification live status:", status);
    });
}

function renderPosts() {
  if (!feed || !template) return;

  feed.innerHTML = "";

  const sortedPosts = getSortedPosts();

  sortedPosts.forEach((post) => {
    const clone = template.content.cloneNode(true);

    const card = clone.querySelector(".card");
    const cardImage = clone.querySelector(".card-image");
    const username = clone.querySelector(".username");
    const tinyAvatar = clone.querySelector(".tiny-avatar");
    const timeStamp = clone.querySelector(".time-stamp");
    const tagPill = clone.querySelector(".tag-pill");
    const cardText = clone.querySelector(".card-text");
    const likeBtn = clone.querySelector(".like-btn");
    const likeCount = clone.querySelector(".like-count");
    const commentToggleBtn = clone.querySelector(".comment-toggle-btn");
    const commentCount = clone.querySelector(".comment-count");
    const pinBtn = clone.querySelector(".pin-btn");
    const deleteBtn = clone.querySelector(".delete-btn");
    const editBtn = clone.querySelector(".edit-btn");
    const commentsList = clone.querySelector(".comments-list");


    if (card) {
      card.style.cursor = "pointer";
      card.addEventListener("click", function (e) {
        if (
          e.target.closest(".like-btn") ||
          e.target.closest(".comment-toggle-btn") ||
          e.target.closest(".pin-btn") ||
          e.target.closest(".delete-btn") ||
          e.target.closest(".comment-submit-btn") ||
          e.target.closest(".comment-input") ||
          e.target.closest(".username")
        ) {
          return;
        }

        openPostView(post);
      });
    }
    if (commentsList) {
  commentsList.innerHTML = "";

  const latestComments = post.comments.slice(-2);

  latestComments.forEach((comment, index) => {
    const preview = document.createElement("div");
    preview.className = "comment-preview";
    preview.textContent = `${comment.user}: ${comment.text}`;

    preview.addEventListener("click", function (e) {
  e.stopPropagation();
  openPostView(post);
  setTimeout(() => {
    openThreadPanel(post.id, comment.id);
  }, 50);
});

    commentsList.appendChild(preview);
  });
}

    if (pinBtn) {
      if (post.username === currentUser) {
        pinBtn.classList.remove("hidden");
        pinBtn.textContent = post.pinned ? "📌 Unpin" : "📌 Pin";

        pinBtn.onclick = async function () {
          const myPinnedPosts = posts.filter(
            (p) => p.username === currentUser && p.pinned
          );

          if (!post.pinned && myPinnedPosts.length >= 2) {
            alert("You can only have 2 pinned posts.");
            return;
          }

          const ok = await updatePostInSupabase(post.id, {
            pinned: !post.pinned
          });

          if (!ok) return;

          await loadPostsFromSupabase();
        };
      } else {
        pinBtn.classList.add("hidden");
      }
    }

    if (cardImage) {
      if (post.image) {
        cardImage.src = post.image;
        cardImage.style.display = "block";
      } else {
        cardImage.style.display = "none";
      }
    }

    if (username) {
      username.textContent = post.username;
      username.onclick = function () {
        openBio(post.username);
      };
    }

    if (tinyAvatar) {
      const bio = bios[post.username];
      if (bio && bio.image) {
        tinyAvatar.innerHTML = `<img src="${bio.image}" alt="Profile picture">`;
      } else {
        tinyAvatar.textContent = bio?.letter || post.userLetter || "?";
      }
    }

    if (timeStamp) timeStamp.textContent = formatTime(post.createdAt);

    if (cardText) {
      const preview = post.description
        ? `${post.text} — ${post.description.substring(0, 80)}${post.description.length > 80 ? "..." : ""}`
        : post.text;

      cardText.innerHTML = highlightMentions(preview);
    }

    if (likeCount) likeCount.textContent = post.likes;
    if (commentCount) commentCount.textContent = post.comments.length;

    if (deleteBtn) {
      if (post.username === currentUser) {
        deleteBtn.classList.remove("hidden");

        deleteBtn.onclick = async function () {
          const confirmed = confirm("Delete this post?");
          if (!confirmed) return;

          const ok = await deletePostFromSupabase(post.id);
          if (!ok) return;

          closePostView();
          await loadPostsFromSupabase();
        };
      } else {
        deleteBtn.classList.add("hidden");
      }
    }
    if (editBtn) {
  if (post.username === currentUser) {
    editBtn.classList.remove("hidden");

    editBtn.onclick = function (e) {
      e.stopPropagation();
      openEditPostModal(post);
    };
  } else {
    editBtn.classList.add("hidden");
  }
}

    if (tagPill) {
      if (!post.pinned) {
        tagPill.textContent = "Post";
        tagPill.style.background = "#ede9fe";
        tagPill.style.color = "#6d28d9";
      } else {
        tagPill.textContent = "Pinned";
        tagPill.style.background = "#dcfce7";
        tagPill.style.color = "#166534";
      }
    }

    if (likeBtn) {
  likeBtn.onclick = async function () {
    const ok = await updatePostInSupabase(post.id, {
      likes: post.likes + 1
    });

    if (!ok) return;

    if (post.username !== currentUser) {
      await addNotification(
        post.username,
        `${currentUser} liked your post`,
        post.id,
        "like"
      );
    }

    await loadPostsFromSupabase();

    const updatedPost = posts.find((p) => p.id === post.id);
    if (activePostId === post.id && updatedPost) {
      openPostView(updatedPost);
    }
  };
}

        
    if (commentToggleBtn) {
  commentToggleBtn.onclick = function (e) {
    e.stopPropagation();
    openPostView(post);
  };
}

    



    feed.appendChild(clone);
  });
}

if (fileInput) {
  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];

    if (!file) {
      selectedImageData = "";
      if (fileName) fileName.textContent = "No file chosen";
      return;
    }

    if (fileName) fileName.textContent = file.name;

    const reader = new FileReader();
    reader.onload = function (event) {
      selectedImageData = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}

if (profilePicInput) {
  profilePicInput.addEventListener("change", function () {
    const file = profilePicInput.files[0];

    if (!file) {
      if (profilePicName) profilePicName.textContent = "No profile pic chosen";
      return;
    }

    if (profilePicName) profilePicName.textContent = file.name;

    const reader = new FileReader();
    reader.onload = function (event) {
      setProfileImage(event.target.result);
      saveLocalData();
    };
    reader.readAsDataURL(file);
  });
}

if (postText) {
  postText.addEventListener("input", function () {
    const text = postText.value;
    const cursorPos = postText.selectionStart;
    const beforeCursor = text.slice(0, cursorPos);
    const match = beforeCursor.match(/@(\w*)$/);

    if (match) {
      showMentionList(match[1]);
    } else if (mentionList) {
      mentionList.classList.add("hidden");
    }
  });
}

document.addEventListener("click", function (e) {
  if (
    mentionList &&
    !mentionList.contains(e.target) &&
    e.target !== postText
  ) {
    mentionList.classList.add("hidden");
  }

  if (
    notifModal &&
    notifBtn &&
    !notifModal.contains(e.target) &&
    !notifBtn.contains(e.target)
  ) {
    closeNotifications();
  }
});

if (postBtn) {
  postBtn.onclick = async function () {
    if (!currentUser || !bios[currentUser]) return;

    const text = postText ? postText.value.trim() : "";
    const description = postDescription ? postDescription.value.trim() : "";

    if (!text) {
      alert("Write something for your post first.");
      return;
    }

    if (editingPostId) {
      const ok = await updatePostInSupabase(editingPostId, {
        text: text,
        description: description,
        image: selectedImageData || ""
      });

      if (!ok) return;

      editingPostId = null;
      if (postBtn) postBtn.textContent = "Post";
      if (postText) postText.value = "";
      if (postDescription) postDescription.value = "";
      if (fileInput) fileInput.value = "";
      if (fileName) fileName.textContent = "No file chosen";
      selectedImageData = "";

      await loadPostsFromSupabase();
      return;
    }

    const img =
      selectedImageData ||
      `https://picsum.photos/500/350?random=${Math.floor(Math.random() * 1000)}`;

    const newPost = {
      username: currentUser,
      userLetter: bios[currentUser].letter || "?",
      text: text,
      description: description,
      image: img,
      likes: 0,
      comments: [],
      pinned: false,
      createdAt: Date.now()
    };

    const ok = await addPostToSupabase(newPost);
    if (!ok) return;

    const mentions = text.match(/(@[a-zA-Z0-9_]+)/g) || [];
    mentions.forEach((mention) => {
      if (bios[mention] && mention !== currentUser) {
        addNotification(
          mention,
          `${currentUser} mentioned you in a post`
        );
      }
    });

    saveLocalData();

    if (postText) postText.value = "";
    if (postDescription) postDescription.value = "";
    if (fileInput) fileInput.value = "";
    if (fileName) fileName.textContent = "No file chosen";
    selectedImageData = "";
    if (mentionList) mentionList.classList.add("hidden");

    await loadPostsFromSupabase();
  };
}

if (saveProfileBtn) {
  saveProfileBtn.onclick = function () {
    if (!currentUser || !bios[currentUser]) return;

    bios[currentUser].role = (editRoleInput ? editRoleInput.value.trim() : "") || "Member";
    bios[currentUser].bio = (editBioInput ? editBioInput.value.trim() : "") || "No bio yet.";
    bios[currentUser].likes = (editLikesInput ? editLikesInput.value.trim() : "") || "Cool stuff";
    bios[currentUser].tag = (editTagInput ? editTagInput.value.trim() : "") || "Dragon";

    saveLocalData();
    refreshMainProfileUI();
    closeProfileEditor();
    renderPosts();
  };
}

if (sortSelect) {
  sortSelect.onchange = renderPosts;
}

if (topAvatar) {
  topAvatar.onclick = function () {
    if (!currentUser) return;
    openProfileEditor();
  };
}

if (notifBtn) {
  notifBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    if (notifModal.classList.contains("hidden")) {
      openNotifications();
    } else {
      closeNotifications();
    }
  });
}

let postsChannel = null;

function subscribeToPostChanges() {
  if (postsChannel) return;

  postsChannel = supabase
    .channel("public-posts-live")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "posts"
      },
      async () => {
        await loadPostsFromSupabase();

        if (activePostId) {
          const updatedPost = posts.find((p) => p.id === activePostId);
          if (updatedPost) {
            openPostView(updatedPost);
          }
        }
      }
    )
    .subscribe((status) => {
      console.log("Supabase live status:", status);
    });
}



if (closeNotifBtn) {
  closeNotifBtn.addEventListener("click", closeNotifications);
}

if (closeBioBtn) {
  closeBioBtn.onclick = closeBio;
}

if (bioBackdrop) {
  bioBackdrop.onclick = closeBio;
}

if (closeProfileEditorBtn) {
  closeProfileEditorBtn.onclick = closeProfileEditor;
}

if (profileEditorBackdrop) {
  profileEditorBackdrop.onclick = closeProfileEditor;
}

if (loginKeywordBtn) {
  loginKeywordBtn.addEventListener("click", signInWithKeyword);
}

if (keywordInput) {
  keywordInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      signInWithKeyword();
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
document.addEventListener("click", function (e) {
  if (
    notifModal &&
    notifBtn &&
    !notifModal.contains(e.target) &&
    !notifBtn.contains(e.target)
  ) {
    notifModal.classList.add("hidden");
  }
});
if (closePostViewBtn) {
  closePostViewBtn.addEventListener("click", closePostView);
}

if (postViewBackdrop) {
  postViewBackdrop.addEventListener("click", closePostView);
}

if (postViewCommentBtn) {
  postViewCommentBtn.addEventListener("click", submitPostViewComment);
}

if (postViewCommentInput) {
  postViewCommentInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      submitPostViewComment();
    }
  });
}


async function startApp() {
  loadLocalData();
  await updateNotificationCount();
  subscribeToPostChanges();

  if (currentUser && bios[currentUser]) {
    subscribeToNotificationChanges();
    hideLoginScreen();
    refreshMainProfileUI();
  } else {
    currentUser = null;
    showLoginScreen();

    if (keywordInput) {
      keywordInput.value = "";
      keywordInput.focus();
    }

    if (loginMessage) {
      loginMessage.textContent = "";
    }
  }

  await loadPostsFromSupabase();
  await startRoleplayLive();
}

const rpPresenceBar = document.getElementById("rpPresenceBar");

let currentRoleplayDocId = "1d88ba60-352c-4f04-969e-aab6ac3c2e11";
let rpChannel = null;
let rpSaveTimer = null;
let isApplyingRemoteUpdate = false;






const areaSelect = document.getElementById("areaSelect");
const feedArea = document.getElementById("feedArea");
const roleplayingArea = document.getElementById("roleplayingArea");

areaSelect.addEventListener("change", () => {
  if (areaSelect.value === "roleplayingArea") {
    feedArea.style.display = "none";
    roleplayingArea.style.display = "block";
  } else {
    feedArea.style.display = "block";
    roleplayingArea.style.display = "none";
  }
});


const roleplayEditor = document.getElementById("roleplayEditor");
const docTabs = document.getElementById("docTabs");
const newDocTabBtn = document.getElementById("newDocTabBtn");
const fontSelect = document.getElementById("fontSelect");
const fontSizeSelect = document.getElementById("fontSizeSelect");
const textColorPicker = document.getElementById("textColorPicker");
const highlightColorPicker = document.getElementById("highlightColorPicker");
const boldBtn = document.getElementById("boldBtn");
const italicBtn = document.getElementById("italicBtn");
const centerBtn = document.getElementById("centerBtn");

if (centerBtn) {
  centerBtn.addEventListener("click", () => {
    formatText("justifyCenter");
  });
}
if (boldBtn) {
  boldBtn.addEventListener("click", () => {
    formatText("bold");
  });
}

if (italicBtn) {
  italicBtn.addEventListener("click", () => {
    formatText("italic");
  });
}
let docs = [
  {
    id: "1d88ba60-352c-4f04-969e-aab6ac3c2e11",
    title: "Main RP Doc",
    content: ""
  }
];

let activeDocId = currentRoleplayDocId;
let savedRange = null;

// Makes execCommand use inline CSS when possible
document.addEventListener("DOMContentLoaded", () => {
  try {
    document.execCommand("styleWithCSS", false, true);
  } catch (e) {
    console.log("styleWithCSS not supported");
  }
});

function saveSelection() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    savedRange = selection.getRangeAt(0);
  }
}

function restoreSelection() {
  if (savedRange) {
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedRange);
  }
}

function formatText(command, value = null) {
  roleplayEditor.focus();   // important
  restoreSelection();       // SUPER important
  document.execCommand(command, false, value);
  saveSelection();
  saveActiveDocContent();
}

function saveActiveDocContent() {
  const activeDoc = docs.find(doc => doc.id === activeDocId);
  if (activeDoc) {
    activeDoc.content = roleplayEditor.innerHTML;
  }
}

function openDoc(docId) {
  saveActiveDocContent();
  activeDocId = docId;

  const activeDoc = docs.find(doc => doc.id === activeDocId);
  if (activeDoc) {
    roleplayEditor.innerHTML = activeDoc.content;
  }

  renderTabs();
}

function renderTabs() {
  docTabs.innerHTML = "";

  docs.forEach(doc => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "doc-tab" + (doc.id === activeDocId ? " active" : "");
    tab.textContent = doc.title;

    tab.addEventListener("click", () => {
      openDoc(doc.id);
    });

    docTabs.appendChild(tab);
  });
}


if (newDocTabBtn) {
  newDocTabBtn.addEventListener("click", createNewTab);
}

if (roleplayEditor) {
  roleplayEditor.addEventListener("input", saveActiveDocContent);
  roleplayEditor.addEventListener("mouseup", saveSelection);
  roleplayEditor.addEventListener("keyup", saveSelection);
  roleplayEditor.addEventListener("mouseleave", saveSelection);
}

if (fontSelect) {
  fontSelect.addEventListener("change", () => {
    formatText("fontName", fontSelect.value);
  });
}

if (fontSizeSelect) {
  fontSizeSelect.addEventListener("change", () => {
    formatText("fontSize", fontSizeSelect.value);
  });
}

if (textColorPicker) {
  textColorPicker.addEventListener("input", () => {
    formatText("foreColor", textColorPicker.value);
  });
}

if (highlightColorPicker) {
  highlightColorPicker.addEventListener("input", () => {
    formatText("hiliteColor", highlightColorPicker.value);
  });
}


async function loadRoleplayDoc(docId) {
  const { data, error } = await supabase
    .from("roleplay_docs")
    .select("id, title, content")
    .eq("id", docId)
    .single();

  if (error) {
    console.error("Could not load RP doc:", error);
    return;
  }

  if (roleplayEditor) {
    roleplayEditor.innerHTML = data.content || "";
  }
}


async function saveRoleplayDoc(docId, content) {
  const { error } = await supabase
    .from("roleplay_docs")
    .update({
      content,
      updated_at: new Date().toISOString()
    })
    .eq("id", docId);

  if (error) {
    console.error("Could not save RP doc:", error);
  }
}

function updateRoleplayPresenceUI() {
  if (!rpChannel || !rpPresenceBar) return;

  const state = rpChannel.presenceState();
  const users = Object.values(state)
    .flat()
    .map((entry) => entry.user)
    .filter(Boolean);

  if (users.length === 0) {
    rpPresenceBar.textContent = "Nobody here yet";
    return;
  }

  rpPresenceBar.textContent = "Editing now: " + users.join(", ");
}


function joinRoleplayChannel(docId) {
  if (rpChannel) {
    supabase.removeChannel(rpChannel);
    rpChannel = null;
  }

  rpChannel = supabase.channel(`rp-doc-${docId}`);

  rpChannel
    .on("broadcast", { event: "doc-update" }, ({ payload }) => {
      if (!payload) return;
      if (payload.sender === currentUser) return;
      if (!roleplayEditor) return;

      isApplyingRemoteUpdate = true;
      roleplayEditor.innerHTML = payload.content || "";
      isApplyingRemoteUpdate = false;
    })
    .on("presence", { event: "sync" }, () => {
      updateRoleplayPresenceUI();
    })
    .on("presence", { event: "join" }, () => {
      updateRoleplayPresenceUI();
    })
    .on("presence", { event: "leave" }, () => {
      updateRoleplayPresenceUI();
    })
    .subscribe(async (status) => {
      console.log("RP channel status:", status);

      if (status === "SUBSCRIBED") {
        await rpChannel.track({
          user: currentUser || "Guest",
          online_at: new Date().toISOString()
        });
      }
    });
}

function broadcastRoleplayUpdate() {
  if (!rpChannel || !roleplayEditor || !currentRoleplayDocId) return;
  if (isApplyingRemoteUpdate) return;

  const content = roleplayEditor.innerHTML;

  rpChannel.send({
    type: "broadcast",
    event: "doc-update",
    payload: {
      docId: currentRoleplayDocId,
      content,
      sender: currentUser || "Guest"
    }
  });

  clearTimeout(rpSaveTimer);
  rpSaveTimer = setTimeout(() => {
    saveRoleplayDoc(currentRoleplayDocId, content);
  }, 1000);
}
if (roleplayEditor) {
  roleplayEditor.addEventListener("input", () => {
    broadcastRoleplayUpdate();
  });
}

async function startRoleplayLive() {
  if (!roleplayEditor || !currentRoleplayDocId) return;

  await loadRoleplayDoc(currentRoleplayDocId);
  joinRoleplayChannel(currentRoleplayDocId);
}

async function createNewTab() {
  const newNumber = docs.length + 1;

  const { data, error } = await supabase
    .from("roleplay_docs")
    .insert({
      title: "Doc " + newNumber,
      content: "<h1>New Roleplay Doc</h1><p>Write something legendary...</p>"
    })
    .select()
    .single();

  if (error) {
    console.error("Could not create new RP doc:", error);
    return;
  }

  docs.push({
    id: data.id,
    title: data.title,
    content: data.content
  });

  activeDocId = data.id;
  currentRoleplayDocId = data.id;

  await loadRoleplayDoc(data.id);
  joinRoleplayChannel(data.id);
  renderTabs();
}

function closeThreadPanel() {
  activeThreadPostId = null;
  activeThreadCommentId = null;
  if (threadReplyInput) threadReplyInput.value = "";
  if (threadOverlay) threadOverlay.classList.add("hidden");
}



function openThreadPanel(postId, commentId) {
  const post = posts.find((p) => String(p.id) === String(postId));
  if (!post || !threadOverlay || !threadComments) return;

  const comment = post.comments.find((c) => String(c.id) === String(commentId));
  if (!comment) return;

  activeThreadPostId = post.id;
  activeThreadCommentId = comment.id;

  if (threadTitle) {
    threadTitle.textContent = `${comment.user}'s Thread`;
  }

  if (threadSubtitle) {
    const replyCount = Array.isArray(comment.replies) ? comment.replies.length : 0;
    threadSubtitle.textContent = `${replyCount} repl${replyCount === 1 ? "y" : "ies"}`;
  }

  if (threadPostMiniAvatar) {
    threadPostMiniAvatar.textContent = bios[comment.user]?.letter || comment.user?.[1] || "?";
  }

  renderSingleCommentThread(post, comment);
  threadOverlay.classList.remove("hidden");
}


function renderSingleCommentThread(post, parentComment) {
  if (!threadComments) return;

  threadComments.innerHTML = "";

  const mainRow = document.createElement("div");
  mainRow.className = "thread-comment";

  const mainAvatar = document.createElement("div");
  mainAvatar.className = "thread-comment-avatar";
  mainAvatar.textContent = bios[parentComment.user]?.letter || parentComment.user?.[1] || "?";

  const mainBody = document.createElement("div");
  mainBody.className = "thread-comment-body";

  const mainUser = document.createElement("div");
  mainUser.className = "thread-comment-user";
  mainUser.textContent = parentComment.user;

  const mainBubble = document.createElement("div");
  mainBubble.className = "thread-comment-bubble";
  mainBubble.innerHTML = highlightMentions(parentComment.text || "");

  const mainTime = document.createElement("div");
  mainTime.className = "thread-comment-time";
  mainTime.textContent = parentComment.created_at ? formatTime(parentComment.created_at) : "";

  mainBody.appendChild(mainUser);
  mainBody.appendChild(mainBubble);
  mainBody.appendChild(mainTime);

  mainRow.appendChild(mainAvatar);
  mainRow.appendChild(mainBody);
  threadComments.appendChild(mainRow);

  const replies = Array.isArray(parentComment.replies) ? parentComment.replies : [];

  replies.forEach((reply) => {
    const row = document.createElement("div");
    row.className = "thread-comment" + (reply.user === currentUser ? " mine" : "");

    const avatar = document.createElement("div");
    avatar.className = "thread-comment-avatar";
    avatar.textContent = bios[reply.user]?.letter || reply.user?.[1] || "?";

    const body = document.createElement("div");
    body.className = "thread-comment-body";

    const user = document.createElement("div");
    user.className = "thread-comment-user";
    user.textContent = reply.user;

    const bubble = document.createElement("div");
    bubble.className = "thread-comment-bubble";
    bubble.innerHTML = highlightMentions(reply.text || "");

    const time = document.createElement("div");
    time.className = "thread-comment-time";
    time.textContent = reply.created_at ? formatTime(reply.created_at) : "";

    body.appendChild(user);
    body.appendChild(bubble);
    body.appendChild(time);

    if (reply.user === currentUser) {
      const editReplyBtn = document.createElement("button");
      editReplyBtn.type = "button";
      editReplyBtn.className = "action-btn edit-btn";
      editReplyBtn.textContent = "✏️ Edit";

      editReplyBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        editThreadReply(post.id, parentComment.id, reply.id);
      });

      body.appendChild(editReplyBtn);
    }

    row.appendChild(avatar);
    row.appendChild(body);
    threadComments.appendChild(row);
  });

  threadComments.scrollTop = threadComments.scrollHeight;
}
  
async function submitThreadReply() {
  if (!activeThreadPostId || !activeThreadCommentId || !currentUser || !threadReplyInput) return;

  const text = threadReplyInput.value.trim();
  if (!text) return;

  const post = posts.find((p) => String(p.id) === String(activeThreadPostId));
  if (!post) return;

  const updatedComments = post.comments.map((comment) => {
    if (String(comment.id) !== String(activeThreadCommentId)) return comment;

    return {
      ...comment,
      replies: [
        ...(Array.isArray(comment.replies) ? comment.replies : []),
        {
          id: crypto.randomUUID(),
          user: currentUser,
          text: text,
          created_at: Date.now()
        }
      ]
    };
  });

  const ok = await updatePostInSupabase(post.id, {
    comments: updatedComments
  });

  if (!ok) return;

  const parentComment = post.comments.find(
    (comment) => String(comment.id) === String(activeThreadCommentId)
  );

  if (parentComment && parentComment.user !== currentUser) {
    await addNotification(
      parentComment.user,
      `${currentUser} replied to your thread`,
      post.id,
      "thread_reply"
    );
  }

  threadReplyInput.value = "";
  await loadPostsFromSupabase();

  const updatedPost = posts.find((p) => String(p.id) === String(activeThreadPostId));
  if (!updatedPost) return;

  const updatedParentComment = updatedPost.comments.find(
    (comment) => String(comment.id) === String(activeThreadCommentId)
  );

  if (updatedParentComment) {
    renderSingleCommentThread(updatedPost, updatedParentComment);
  }
}
if (threadReplyBtn) {
  threadReplyBtn.addEventListener("click", submitThreadReply);
}

if (threadReplyInput) {
  threadReplyInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      submitThreadReply();
    }
  });
}

if (closeThreadBtn) {
  closeThreadBtn.addEventListener("click", closeThreadPanel);
}

function openEditPostModal(post) {
  editingPostId = post.id;

  if (postText) postText.value = post.text || "";
  if (postDescription) postDescription.value = post.description || "";

  selectedImageData = post.image || "";
  if (fileName) {
    fileName.textContent = post.image ? "Current image selected" : "No file chosen";
  }

  if (postBtn) {
    postBtn.textContent = "Save Edit";
  }
  closePostView();
closeThreadPanel();

  window.scrollTo({ top: 0, behavior: "smooth" });
}
function editTopLevelComment(postId, commentId) {
  const post = posts.find((p) => String(p.id) === String(postId));
  if (!post) return;

  const comment = post.comments.find((c) => String(c.id) === String(commentId));
  if (!comment) return;

  openEditCommentModal(comment.text || "", postId, commentId);
}
function editThreadReply(postId, parentCommentId, replyId) {
  const post = posts.find((p) => String(p.id) === String(postId));
  if (!post) return;

  const parentComment = post.comments.find(
    (c) => String(c.id) === String(parentCommentId)
  );
  if (!parentComment) return;

  const reply = (parentComment.replies || []).find(
    (r) => String(r.id) === String(replyId)
  );
  if (!reply) return;

  openEditCommentModal(reply.text || "", postId, parentCommentId, replyId);
}
function openEditCommentModal(text, postId, commentId, replyId = null) {
  editingCommentPostId = postId;
  editingCommentId = commentId;
  editingReplyId = replyId;

  if (editCommentInput) {
    editCommentInput.value = text || "";
    editCommentInput.focus();
  }

  if (editCommentModal) {
    editCommentModal.classList.remove("hidden");
  }
}

function closeEditCommentModal() {
  editingCommentPostId = null;
  editingCommentId = null;
  editingReplyId = null;

  if (editCommentInput) {
    editCommentInput.value = "";
  }

  if (editCommentModal) {
    editCommentModal.classList.add("hidden");
  }
}
async function saveEditedComment() {
  if (!editingCommentPostId || !editingCommentId || !editCommentInput) return;

  const newText = editCommentInput.value.trim();
  if (!newText) return;

  const post = posts.find((p) => String(p.id) === String(editingCommentPostId));
  if (!post) return;

  let updatedComments;

  if (editingReplyId) {
    updatedComments = post.comments.map((comment) => {
      if (String(comment.id) !== String(editingCommentId)) return comment;

      return {
        ...comment,
        replies: (comment.replies || []).map((reply) => {
          if (String(reply.id) !== String(editingReplyId)) return reply;
          return {
            ...reply,
            text: newText
          };
        })
      };
    });
  } else {
    updatedComments = post.comments.map((comment) => {
      if (String(comment.id) !== String(editingCommentId)) return comment;
      return {
        ...comment,
        text: newText
      };
    });
  }

  const ok = await updatePostInSupabase(post.id, {
    comments: updatedComments
  });

  if (!ok) return;

  await loadPostsFromSupabase();
  closeEditCommentModal();

  const updatedPost = posts.find((p) => String(p.id) === String(editingCommentPostId));
  if (!updatedPost) return;

  if (editingReplyId) {
    const updatedParentComment = updatedPost.comments.find(
      (c) => String(c.id) === String(editingCommentId)
    );

    if (updatedParentComment) {
      openThreadPanel(updatedPost.id, updatedParentComment.id);
    }
  } else {
    openPostView(updatedPost);
  }
}
if (closeEditCommentBtn) {
  closeEditCommentBtn.addEventListener("click", closeEditCommentModal);
}

if (editCommentBackdrop) {
  editCommentBackdrop.addEventListener("click", closeEditCommentModal);
}

if (saveEditCommentBtn) {
  saveEditCommentBtn.addEventListener("click", saveEditedComment);
}

if (editCommentInput) {
  editCommentInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveEditedComment();
    }
  });
}

startApp();
renderTabs();
openDoc(activeDocId);