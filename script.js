console.log("script loaded");
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://cvjkxmgfiaoetepwfyqi.supabase.co";
const supabaseKey = "sb_publishable_92kz51al3ZuihOY047N5Gw_zRqOGQ2v";
const supabase = createClient(supabaseUrl, supabaseKey);
const postsCacheKey = "dragon_posts_cache_v3";

// =========================
// DOM
// =========================
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
const notifBtn = document.getElementById("notifBtn");
const notifModal = document.getElementById("notifModal");
const closeNotifBtn = document.getElementById("closeNotifBtn");
const clearNotificationsBtn = document.getElementById("clearNotificationsBtn");
const notifList = document.getElementById("notifList");
const messageUserBtn = document.getElementById("messageUserBtn");
const topAvatar = document.getElementById("topAvatar");
const postAvatar = document.getElementById("postAvatar");

const bioModal = document.getElementById("bioModal");
const bioBackdrop = document.getElementById("bioBackdrop");
const closeBioBtn = document.getElementById("closeBioBtn");
const bioAvatar = document.getElementById("bioAvatar");
const bioName = document.getElementById("bioName");
const bioRole = document.getElementById("bioRole");
const bioText = document.getElementById("bioText");
const bioLikes = document.getElementById("bioLikes");
const bioTag = document.getElementById("bioTag");
const messagesModal = document.getElementById("messagesModal");
const messagesBackdrop = document.getElementById("messagesBackdrop");
const closeMessagesBtn = document.getElementById("closeMessagesBtn");
const conversationList = document.getElementById("conversationList");
const activeChatName = document.getElementById("activeChatName");
const messagesList = document.getElementById("messagesList");
const messageInput = document.getElementById("messageInput");
const sendMessageBtn = document.getElementById("sendMessageBtn");
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
const postViewVideo = document.getElementById("postViewVideo");
const postViewPlaceholder = document.getElementById("postViewPlaceholder");
const postViewAvatar = document.getElementById("postViewAvatar");
const postViewUsername = document.getElementById("postViewUsername");
const postViewTime = document.getElementById("postViewTime");
const postViewTitle = document.getElementById("postViewTitle");
const postViewDescription = document.getElementById("postViewDescription");
const postViewComments = document.getElementById("postViewComments");
const postViewCommentInput = document.getElementById("postViewCommentInput");
const postViewCommentBtn = document.getElementById("postViewCommentBtn");
const openMessagesBtn = document.getElementById("openMessagesBtn");
// Area switching
const areaSelect = document.getElementById("areaSelect");
const feedArea = document.getElementById("feedArea");
const roleplayingArea = document.getElementById("roleplayingArea");
const marketArea = document.getElementById("marketArea");

// Roleplay editor
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

// Market editor
const marketEditor = document.getElementById("marketEditor");
const marketTabs = document.getElementById("marketTabs");
const newMarketTabBtn = document.getElementById("newMarketTabBtn");
const marketFontSelect = document.getElementById("marketFontSelect");
const marketFontSizeSelect = document.getElementById("marketFontSizeSelect");
const marketTextColorPicker = document.getElementById("marketTextColorPicker");
const marketHighlightColorPicker = document.getElementById("marketHighlightColorPicker");
const marketBoldBtn = document.getElementById("marketBoldBtn");
const marketItalicBtn = document.getElementById("marketItalicBtn");
const marketCenterBtn = document.getElementById("marketCenterBtn");

// =========================
// State
// =========================
let currentUser = null;
let notifications = [];
let selectedImageData = "";
let selectedMediaFile = null;
let activePostId = null;
let posts = [];
let editingPostId = null;
let activeThreadPostId = null;
let activeThreadCommentId = null;
let postsChannel = null;
let profilesChannel = null;
let conversations = [];
let activeConversationId = null;
let activeConversationUser = null;
let messagesChannel = null;
// =========================
// Data
// =========================
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
  revived: "@Deirdre",
  squid_staff: "@Koding_Kraken",
  crow_staff: "@Coding_Crow",
  brother: "@Paul"
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
  },
  "@Coding_Crow": {
    letter: "C",
    role: "Staff",
    bio: "Hello! I helped make this website! Ask me anything!",
    likes: "Coding, Writing, Shinies",
    tag: "How did a crow get on staff?",
    image: ""
  },
  "@Koding_Kraken": {
    letter: "K",
    role: "Coder",
    bio: "What's up! I'm Kraken and I'm one of the coders of this wonderfull ever changing website",
    likes: "Coding",
    tag: "Kraken",
    image: ""
  },
  "@Paul": {
    letter: "P",
    role: "The Brother",
    bio: "hello :D",
    likes: "swimming and dogs",
    tag: "pool",
    image: ""
  },
};
const admins = ["@Coding_Crow", "@Koding_Kraken"];

function isAdmin(user) {
  return admins.includes(user);
}

const users = Object.keys(bios);

// =========================
// Local storage
// =========================
function saveLocalData() {
  try {
    localStorage.setItem("dragon_bios", JSON.stringify(bios));
    localStorage.setItem("dragon_notifications", JSON.stringify(notifications));
    localStorage.setItem("dragon_currentUser", currentUser || "");
  } catch (error) {
    console.error("Could not save local data:", error);
  }
}

function loadLocalData() {
  try {
    const savedBios = localStorage.getItem("dragon_bios");
    const savedNotifications = localStorage.getItem("dragon_notifications");
    const savedCurrentUser = localStorage.getItem("dragon_currentUser");

    if (savedBios) {
      const parsedBios = JSON.parse(savedBios);
      if (parsedBios && typeof parsedBios === "object") {
        Object.keys(parsedBios).forEach((key) => {
          bios[key] = parsedBios[key];
        });
      }
    }

    if (savedNotifications) {
      const parsedNotifications = JSON.parse(savedNotifications);
      if (Array.isArray(parsedNotifications)) {
        notifications = parsedNotifications;
      }
    }

    if (savedCurrentUser) {
      currentUser = savedCurrentUser;
    }
  } catch (error) {
    console.error("Could not load local data:", error);
  }
}

// =========================
// Helpers
// =========================

function openMessagesModal() {
  if (messagesModal) messagesModal.classList.remove("hidden");
}

function closeMessagesModal() {
  if (messagesModal) messagesModal.classList.add("hidden");
  activeConversationId = null;
  activeConversationUser = null;
  if (messageInput) messageInput.value = "";

  if (messagesChannel) {
    supabase.removeChannel(messagesChannel);
    messagesChannel = null;
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

function isVideoSource(src) {
  const value = String(src || "").split("?")[0].toLowerCase();
  return value.startsWith("data:video/") || /\.(mp4|webm|ogg|mov|m4v)$/.test(value);
}

function isOldGeneratedPostImage(src) {
  if (typeof src !== "string" || src.trim() === "") return false;

  try {
    const url = new URL(src);
    return url.pathname === "/500/350" && url.searchParams.has("random");
  } catch (error) {
    return false;
  }
}

function hasPostMedia(post) {
  return typeof post?.image === "string" &&
    post.image.trim() !== "" &&
    !isOldGeneratedPostImage(post.image);
}

function getCacheablePostMedia(image) {
  if (typeof image !== "string") return "";
  if (image.startsWith("data:")) return "";
  if (isOldGeneratedPostImage(image)) return "";
  return image;
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

function shouldNotifyForPost(post, actingUser) {
  if (!currentUser) return false;
  if (post.username === actingUser) return false;
  if (post.username === currentUser) return true;

  const iAlreadyCommented = post.comments.some(
    (comment) => comment.user === currentUser
  );

  return iAlreadyCommented;
}

// =========================
// Notifications
// =========================
function updateNotificationCount() {
  if (!notifCount) return;
  const unreadCount = notifications.filter((notif) => !notif.read).length;
  notifCount.textContent = String(unreadCount);

  if (clearNotificationsBtn) {
    clearNotificationsBtn.disabled = notifications.length === 0;
  }
}

async function addNotification(targetUser, text, postId = null, type = "general") {
  const actorUser = currentUser || "System";

  const { error } = await supabase.from("notifications").insert({
    target_user: targetUser,
    actor_user: actorUser,
    text: text,
    post_id: postId,
    type: type,
    read: false,
    created_at: Date.now()
  });

  if (error) {
    console.error("Could not add notification:", error.message);
    return false;
  }

  return true;
}
async function uploadProfileImage(file) {
  if (!currentUser || !file) return null;
  if (!file.type.startsWith("image/")) return null;

  const safeUser = currentUser.replace("@", "").replace(/[^a-zA-Z0-9_]/g, "_");
  const fileExt = file.name.split(".").pop() || "png";
  const cacheVersion = Date.now();
  const filePath = `${safeUser}/avatar.${fileExt}`;

  const { error: uploadError } = await supabase
    .storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type || "image/png"
    });

  if (uploadError) {
    console.error("Could not upload avatar:", uploadError.message);
    console.warn("Falling back to compressed profile image in the profiles table.");
    return resizeProfileImageToDataUrl(file);
  }

  const { data } = supabase
    .storage
    .from("avatars")
    .getPublicUrl(filePath);

  return `${data.publicUrl}?v=${cacheVersion}`;
}

function resizeProfileImageToDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onerror = () => resolve(null);
    reader.onload = () => {
      const img = new Image();

      img.onerror = () => resolve(null);
      img.onload = () => {
        const maxSize = 360;
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(null);
          return;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

async function uploadPostVideo(file) {
  if (!currentUser || !file) return null;

  const safeUser = currentUser.replace("@", "").replace(/[^a-zA-Z0-9_]/g, "_");
  const fileExt = file.name.split(".").pop() || "mp4";
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 40) || "video";
  const filePath = `${safeUser}/posts/${Date.now()}-${safeName}.${fileExt}`;

  const { error: uploadError } = await supabase
    .storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "video/mp4"
    });

  if (uploadError) {
    console.error("Could not upload post video:", uploadError.message);
    alert("Could not upload video. Try a smaller MP4, or check the storage bucket settings.");
    return null;
  }

  const { data } = supabase
    .storage
    .from("avatars")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result || "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function getSelectedPostMedia() {
  if (!selectedMediaFile) return selectedImageData;

  if (selectedMediaFile.type.startsWith("video/")) {
    return await uploadPostVideo(selectedMediaFile);
  }

  if (selectedImageData) return selectedImageData;
  return await readFileAsDataUrl(selectedMediaFile);
}
async function loadNotificationsFromSupabase() {
  if (!currentUser) {
    notifications = [];
    updateNotificationCount();
    return;
  }

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("target_user", currentUser)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not load notifications:", error.message);
    return;
  }

  notifications = (data || []).map((notif) => ({
    id: notif.id,
    recipient: notif.target_user,
    sender: notif.actor_user,
    text: notif.text,
    postId: notif.post_id,
    type: notif.type,
    createdAt: notif.created_at,
    read: notif.read
  }));

  updateNotificationCount();
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

  const notif = notifications.find((n) => n.id === notificationId);
  if (notif) {
    notif.read = true;
  }

  updateNotificationCount();
}

async function clearAllNotifications() {
  if (!currentUser) return;

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("target_user", currentUser);

  if (error) {
    console.error("Could not clear notifications:", error.message);
    alert("Could not clear notifications.");
    return;
  }

  notifications = [];
  saveLocalData();
  updateNotificationCount();
  openNotifications();
}

async function openNotificationTarget(notificationId) {
  const notif = notifications.find((n) => n.id === notificationId);
  if (!notif) return;

  await markNotificationAsRead(notificationId);
  closeNotifications();

  if (!notif.postId) return;

  const targetPost = posts.find((p) => String(p.id) === String(notif.postId));
  if (!targetPost) {
    alert("That post could not be found.");
    return;
  }

  openPostView(targetPost);
}

async function openNotifications() {
  if (!notifModal || !notifList) return;

  notifList.innerHTML = "";

  if (notifications.length === 0) {
    const empty = document.createElement("div");
    empty.className = "comment";
    empty.textContent = "No notifications yet.";
    notifList.appendChild(empty);
  } else {
    notifications.forEach((notif) => {
      const div = document.createElement("button");
      div.type = "button";
      div.className = "comment notif-item";
      div.style.cursor = notif.postId ? "pointer" : "default";
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
      time.textContent = formatTime(notif.createdAt);

      div.appendChild(text);
      div.appendChild(time);

      div.addEventListener("click", async function (e) {
        e.stopPropagation();

        if (notif.postId) {
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

function closeNotifications() {
  if (notifModal) notifModal.classList.add("hidden");
}

// =========================
// Login / profile
// =========================
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
  saveLocalData();
  hideLoginScreen();
  refreshMainProfileUI();

  await loadPostsFromSupabase();
  await loadNotificationsFromSupabase();

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

  if (messageUserBtn) {
    if (!currentUser || usernameText === currentUser) {
      messageUserBtn.classList.add("hidden");
      messageUserBtn.onclick = null;
    } else {
      messageUserBtn.classList.remove("hidden");

      messageUserBtn.onclick = async function () {
        console.log("Message button clicked for:", usernameText);

        const conversation = await getOrCreateConversation(usernameText);
        console.log("Conversation result:", conversation);

        if (!conversation) {
          alert("Could not open conversation.");
          return;
        }

        closeBio();
        await loadConversations();
        await openConversation(conversation.id, usernameText);
      };
    }
  }

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

// =========================
// Mentions
// =========================
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

// =========================
// Posts / Supabase
// =========================
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
  likedBy: Array.isArray(post.liked_by) ? post.liked_by : [],
  comments: Array.isArray(post.comments) ? post.comments : [],
  pinned: !!post.pinned,
  createdAt: Number(post.created_at) || Date.now()
}));

  try {
  const lightweightPosts = posts.slice(0, 20).map((p) => ({
    id: p.id,
    username: p.username,
    userLetter: p.userLetter,
    text: p.text,
    description: p.description,
    image: getCacheablePostMedia(p.image),
    likes: p.likes,
    likedBy: p.likedBy,
    pinned: p.pinned,
    createdAt: p.createdAt,
    comments: []
  }));

  localStorage.setItem(postsCacheKey, JSON.stringify(lightweightPosts));
} catch (e) {
  console.warn("Storage full, skipping cache");
}

  renderPosts();
}

async function addPostToSupabase(newPost) {
  const { error } = await supabase.from("posts").insert({
    username: newPost.username,
    user_letter: newPost.userLetter,
    text: newPost.text,
    description: newPost.description,
    image: newPost.image,
    likes: newPost.likes,
    liked_by: newPost.likedBy || [],
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
async function saveProfileToSupabase(username) {
  const profile = bios[username];
  if (!profile) return false;

  const { error } = await supabase
    .from("profiles")
    .upsert({
      username,
      role: profile.role,
      bio: profile.bio,
      likes: profile.likes,
      tag: profile.tag,
      image: profile.image || ""
    });

  if (error) {
    console.error("Could not save profile:", error.message);
    return false;
  }

  return true;
}

async function loadProfilesFromSupabase() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*");

  if (error) {
    console.error("Could not load profiles:", error.message);
    return;
  }

  (data || []).forEach(applyProfileFromSupabase);
}

function applyProfileFromSupabase(profile) {
  if (!profile || !bios[profile.username]) return;

  bios[profile.username].role = profile.role || bios[profile.username].role;
  bios[profile.username].bio = profile.bio || bios[profile.username].bio;
  bios[profile.username].likes = profile.likes || bios[profile.username].likes;
  bios[profile.username].tag = profile.tag || bios[profile.username].tag;
  bios[profile.username].image = profile.image || bios[profile.username].image;
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

// =========================
// Post view / comments
// =========================
function openPostView(post) {
  activePostId = post.id;

  if (postViewImage && postViewVideo && postViewPlaceholder) {
    const hasMedia = hasPostMedia(post);

    postViewImage.style.display = "none";
    postViewVideo.style.display = "none";
    postViewPlaceholder.style.display = "none";
    postViewVideo.pause();
    postViewVideo.removeAttribute("src");
    postViewVideo.load();
    postViewImage.removeAttribute("src");

    if (hasMedia && isVideoSource(post.image)) {
      postViewVideo.src = post.image;
      postViewVideo.style.display = "block";
      postViewVideo.classList.remove("hidden");
    } else if (hasMedia) {
      postViewImage.src = post.image;
      postViewImage.style.display = "block";
      postViewImage.classList.remove("hidden");
    } else {
      postViewPlaceholder.style.display = "block";
      postViewPlaceholder.classList.remove("hidden");
    }
  }

  const bio = bios[post.username];
  const avatarImage = bio?.image || "";

  if (postViewAvatar) {
    if (avatarImage) {
      postViewAvatar.innerHTML = `<img src="${avatarImage}" alt="Profile picture">`;
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

      card.addEventListener("click", function () {
        openThreadPanel(post.id, comment.id);
      });

      postViewComments.appendChild(card);
    });
  }

  if (postViewCommentInput) postViewCommentInput.value = "";

  if (postViewModal) postViewModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
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
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          user: currentUser,
          text,
          created_at: Date.now()
        }
      ]
    };
  });

  const ok = await updatePostInSupabase(post.id, {
    comments: updatedComments
  });

  if (!ok) return;

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
function closePostView() {
  activePostId = null;
  if (postViewVideo) postViewVideo.pause();
  if (postViewModal) postViewModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

async function submitPostViewComment() {
  if (!activePostId || !currentUser || !postViewCommentInput) return;

  const text = postViewCommentInput.value.trim();
  if (!text) return;

  const post = posts.find((p) => String(p.id) === String(activePostId));
  if (!post) return;

  const newComment = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    user: currentUser,
    text,
    created_at: Date.now(),
    replies: []
  };

  const oldComments = [...post.comments];
  post.comments = [...post.comments, newComment];

  postViewCommentInput.value = "";
  renderPosts();
  openPostView(post);

  const ok = await updatePostInSupabase(post.id, {
    comments: post.comments
  });

  if (!ok) {
    post.comments = oldComments;
    renderPosts();

    const restoredPost = posts.find((p) => String(p.id) === String(activePostId));
    if (restoredPost) openPostView(restoredPost);

    alert("Could not save comment.");
    return;
  }

  if (post.username !== currentUser) {
    await addNotification(
      post.username,
      `${currentUser} commented on your post`,
      post.id,
      "comment"
    );
  }

  
}

// =========================
// Render posts
// =========================
function renderPosts() {
  if (!feed || !template) return;

  feed.innerHTML = "";
  const sortedPosts = getSortedPosts();

  sortedPosts.forEach((post) => {
    const clone = template.content.cloneNode(true);

    const card = clone.querySelector(".card");
    const cardImage = clone.querySelector(".card-image");
    const cardVideo = clone.querySelector(".card-video");
    const cardPlaceholder = clone.querySelector(".card-placeholder");
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
    const commentsPanel = clone.querySelector(".comments-panel");
    const commentsList = clone.querySelector(".comments-list");
    const commentInput = clone.querySelector(".comment-input");
    const commentSubmitBtn = clone.querySelector(".comment-submit-btn");

    if (card) {
      card.style.cursor = "pointer";
      card.addEventListener("click", function (e) {
        if (
          e.target.closest(".like-btn") ||
          e.target.closest(".comment-toggle-btn") ||
          e.target.closest(".pin-btn") ||
          e.target.closest(".delete-btn") ||
          e.target.closest(".edit-btn") ||
          e.target.closest(".comment-submit-btn") ||
          e.target.closest(".comment-input") ||
          e.target.closest(".card-video") ||
          e.target.closest(".username")
        ) {
          return;
        }

        openPostView(post);
      });
    }

    if (cardImage && cardVideo && cardPlaceholder) {
      const hasMedia = hasPostMedia(post);

      cardImage.style.display = "none";
      cardVideo.style.display = "none";
      cardPlaceholder.style.display = "none";
      cardVideo.removeAttribute("src");
      cardImage.removeAttribute("src");

      if (hasMedia && isVideoSource(post.image)) {
        cardVideo.src = post.image;
        cardVideo.style.display = "block";
        cardVideo.classList.remove("hidden");
      } else if (hasMedia) {
        cardImage.src = post.image;
        cardImage.style.display = "block";
        cardImage.classList.remove("hidden");
      } else {
        cardPlaceholder.style.display = "block";
        cardPlaceholder.classList.remove("hidden");
      }
    }

    if (username) {
      username.textContent = post.username;
      username.onclick = function (e) {
        e.stopPropagation();
        openBio(post.username);
      };
    }

    if (tinyAvatar) {
  const bio = bios[post.username];
  const avatarImage = bio?.image || "";

  if (avatarImage) {
    tinyAvatar.innerHTML = `<img src="${avatarImage}" alt="Profile picture">`;
  } else {
    tinyAvatar.textContent = bio?.letter || post.userLetter || "?";
  }
}

    if (timeStamp) {
      timeStamp.textContent = formatTime(post.createdAt);
    }

    if (cardText) {
      const preview = post.description
        ? `${post.text} — ${post.description.substring(0, 80)}${post.description.length > 80 ? "..." : ""}`
        : post.text;

      cardText.innerHTML = highlightMentions(preview);
    }

    if (likeCount) likeCount.textContent = post.likes;
    if (commentCount) commentCount.textContent = post.comments.length;

    if (tagPill) {
      if (post.pinned) {
        tagPill.textContent = "Pinned";
        tagPill.style.background = "#dcfce7";
        tagPill.style.color = "#166534";
      } else {
        tagPill.textContent = "Post";
        tagPill.style.background = "#ede9fe";
        tagPill.style.color = "#6d28d9";
      }
    }

    if (pinBtn) {
      if (post.username === currentUser) {
        pinBtn.classList.remove("hidden");
        pinBtn.textContent = post.pinned ? "📌 Unpin" : "📌 Pin";

        pinBtn.onclick = async function (e) {
          e.stopPropagation();

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

    if (deleteBtn) {
  if (post.username === currentUser || isAdmin(currentUser)) {
    deleteBtn.classList.remove("hidden");

    deleteBtn.onclick = async function (e) {
      e.stopPropagation();

      const confirmed = confirm(
        isAdmin(currentUser) && post.username !== currentUser
          ? `Delete ${post.username}'s post?`
          : "Delete this post?"
      );
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

    if (commentsList) {
      commentsList.innerHTML = "";
      commentsList.style.display = "none";
    }

    if (commentsPanel) {
      commentsPanel.classList.add("hidden");
      commentsPanel.style.display = "none";
    }

    if (likeBtn) {
  const alreadyLiked = currentUser && post.likedBy.includes(currentUser);

  likeBtn.textContent = alreadyLiked ? "❤️ Liked" : "❤️ Like";
  likeBtn.disabled = !!alreadyLiked;

  likeBtn.onclick = async function (e) {
    e.stopPropagation();

    if (!currentUser) return;

    if (post.likedBy.includes(currentUser)) {
      alert("You already liked this post.");
      return;
    }

    const updatedLikedBy = [...post.likedBy, currentUser];

    const ok = await updatePostInSupabase(post.id, {
      likes: updatedLikedBy.length,
      liked_by: updatedLikedBy
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

    if (commentSubmitBtn && commentInput) {
      commentSubmitBtn.onclick = async function (e) {
        e.stopPropagation();

        const text = commentInput.value.trim();
        if (!text || !currentUser) return;

        const updatedComments = [
          ...post.comments,
          {
            id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
            user: currentUser,
            text,
            created_at: Date.now(),
            replies: []
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

        saveLocalData();
        await loadPostsFromSupabase();

        const updatedPost = posts.find((p) => p.id === post.id);
        if (activePostId === post.id && updatedPost) {
          openPostView(updatedPost);
        }
      };

      commentInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          commentSubmitBtn.click();
        }
      });
    }

    feed.appendChild(clone);
  });
}

// =========================
// Post editing
// =========================
function openEditPostModal(post) {
  editingPostId = post.id;

  if (postText) postText.value = post.text || "";
  if (postDescription) postDescription.value = post.description || "";

  selectedImageData = post.image || "";
  selectedMediaFile = null;
  if (fileName) {
    fileName.textContent = post.image
      ? `Current ${isVideoSource(post.image) ? "video" : "image"} selected`
      : "No file chosen";
  }

  if (postBtn) postBtn.textContent = "Save Edit";

  closePostView();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// =========================
// Area switching
// =========================
function updateAreaVisibility() {
  if (!areaSelect) return;

  const selected = areaSelect.value;

  if (feedArea) feedArea.style.display = selected === "feedArea" ? "block" : "none";
  if (roleplayingArea) roleplayingArea.style.display = selected === "roleplayingArea" ? "block" : "none";
  if (marketArea) marketArea.style.display = selected === "marketArea" ? "block" : "none";
}

// =========================
// Shared rich text editor setup
// =========================
document.addEventListener("DOMContentLoaded", () => {
  try {
    document.execCommand("styleWithCSS", false, true);
  } catch (e) {
    console.log("styleWithCSS not supported");
  }
});

function makeEditorSystem({
  editor,
  tabsWrap,
  newTabBtn,
  fontSelectEl,
  fontSizeSelectEl,
  textColorPickerEl,
  highlightColorPickerEl,
  boldBtnEl,
  italicBtnEl,
  centerBtnEl,
  initialDocs,
  newDocTitlePrefix
}) {
  let docs = [...initialDocs];
  let activeDocId = docs[0]?.id ?? 1;
  let savedRange = null;

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

  function saveActiveDocContent() {
    const activeDoc = docs.find((doc) => doc.id === activeDocId);
    if (activeDoc && editor) {
      activeDoc.content = editor.innerHTML;
    }
  }

  function formatText(command, value = null) {
    if (!editor) return;
    editor.focus();
    restoreSelection();
    document.execCommand(command, false, value);
    saveSelection();
    saveActiveDocContent();
  }

  function openDoc(docId) {
    saveActiveDocContent();
    activeDocId = docId;

    const activeDoc = docs.find((doc) => doc.id === activeDocId);
    if (activeDoc && editor) {
      editor.innerHTML = activeDoc.content;
    }

    renderTabs();
  }

  function renderTabs() {
    if (!tabsWrap) return;

    tabsWrap.innerHTML = "";

    docs.forEach((doc) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "doc-tab" + (doc.id === activeDocId ? " active" : "");
      tab.textContent = doc.title;
      tab.addEventListener("click", () => openDoc(doc.id));
      tabsWrap.appendChild(tab);
    });
  }

  function createNewTab() {
    saveActiveDocContent();

    const newId = Date.now() + Math.random();
    const newNumber = docs.length + 1;

    docs.push({
      id: newId,
      title: `${newDocTitlePrefix} ${newNumber}`,
      content: `<h1>${newDocTitlePrefix} ${newNumber}</h1><p>Write something legendary...</p>`
    });

    activeDocId = newId;
    renderTabs();
    openDoc(newId);
  }

  if (newTabBtn) newTabBtn.addEventListener("click", createNewTab);

  if (editor) {
    editor.addEventListener("input", saveActiveDocContent);
    editor.addEventListener("mouseup", saveSelection);
    editor.addEventListener("keyup", saveSelection);
    editor.addEventListener("mouseleave", saveSelection);
  }

  if (fontSelectEl) {
    fontSelectEl.addEventListener("change", () => formatText("fontName", fontSelectEl.value));
  }

  if (fontSizeSelectEl) {
    fontSizeSelectEl.addEventListener("change", () => formatText("fontSize", fontSizeSelectEl.value));
  }

  if (textColorPickerEl) {
    textColorPickerEl.addEventListener("input", () => formatText("foreColor", textColorPickerEl.value));
  }

  if (highlightColorPickerEl) {
    highlightColorPickerEl.addEventListener("input", () => formatText("hiliteColor", highlightColorPickerEl.value));
  }

  if (boldBtnEl) boldBtnEl.addEventListener("click", () => formatText("bold"));
  if (italicBtnEl) italicBtnEl.addEventListener("click", () => formatText("italic"));
  if (centerBtnEl) centerBtnEl.addEventListener("click", () => formatText("justifyCenter"));

  renderTabs();
  openDoc(activeDocId);

  return { renderTabs, openDoc };
}

makeEditorSystem({
  editor: roleplayEditor,
  tabsWrap: docTabs,
  newTabBtn: newDocTabBtn,
  fontSelectEl: fontSelect,
  fontSizeSelectEl: fontSizeSelect,
  textColorPickerEl: textColorPicker,
  highlightColorPickerEl: highlightColorPicker,
  boldBtnEl: boldBtn,
  italicBtnEl: italicBtn,
  centerBtnEl: centerBtn,
  initialDocs: [
    {
      id: 1,
      title: "Doc 1",
      content: "<h1>🐉 Roleplay Zone</h1><p>Start your story here...</p>"
    }
  ],
  newDocTitlePrefix: "Doc"
});

makeEditorSystem({
  editor: marketEditor,
  tabsWrap: marketTabs,
  newTabBtn: newMarketTabBtn,
  fontSelectEl: marketFontSelect,
  fontSizeSelectEl: marketFontSizeSelect,
  textColorPickerEl: marketTextColorPicker,
  highlightColorPickerEl: marketHighlightColorPicker,
  boldBtnEl: marketBoldBtn,
  italicBtnEl: marketItalicBtn,
  centerBtnEl: marketCenterBtn,
  initialDocs: [
    {
      id: 1,
      title: "Market 1",
      content: "<h1>The Market</h1><p>Peruse the stalls!</p>"
    }
  ],
  newDocTitlePrefix: "Market"
});

// =========================
// Events
// =========================
if (fileInput) {
  fileInput.addEventListener("change", function () {
    const file = fileInput.files?.[0];
    const previousMedia = selectedImageData;

    if (!file) {
      selectedImageData = "";
      selectedMediaFile = null;
      if (fileName) fileName.textContent = "No file chosen";
      return;
    }

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      fileInput.value = "";
      selectedMediaFile = null;
      if (fileName) {
        fileName.textContent = previousMedia
          ? `Current ${isVideoSource(previousMedia) ? "video" : "image"} selected`
          : "No file chosen";
      }
      alert("Please choose an image or video file.");
      return;
    }

    selectedMediaFile = file;
    if (fileName) fileName.textContent = file.name;

    if (file.type.startsWith("video/")) {
      selectedImageData = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      selectedImageData = event.target?.result || "";
    };
    reader.readAsDataURL(file);
  });
}

if (threadReplyBtn) {
  threadReplyBtn.addEventListener("click", submitThreadReply);
}

if (threadReplyInput) {
  threadReplyInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitThreadReply();
    }
  });
}

if (closeThreadBtn) {
  closeThreadBtn.addEventListener("click", closeThreadPanel);
}

if (threadBackdrop) {
  threadBackdrop.addEventListener("click", closeThreadPanel);
}
if (openMessagesBtn) {
  openMessagesBtn.addEventListener("click", async function () {
    if (!currentUser) return;
    await loadConversations();
    openMessagesModal();
  });
}
if (closeMessagesBtn) {
  closeMessagesBtn.addEventListener("click", closeMessagesModal);
}

if (messagesBackdrop) {
  messagesBackdrop.addEventListener("click", closeMessagesModal);
}

if (sendMessageBtn) {
  sendMessageBtn.addEventListener("click", sendMessage);
}

if (messageInput) {
  messageInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
}

if (profilePicInput) {
  profilePicInput.addEventListener("change", async function () {
    const file = profilePicInput.files?.[0];

    if (!file) {
      if (profilePicName) profilePicName.textContent = "No profile pic chosen";
      return;
    }

    if (!file.type.startsWith("image/")) {
      if (profilePicName) profilePicName.textContent = "No profile pic chosen";
      alert("Please choose an image file for your profile picture.");
      return;
    }

    if (profilePicName) profilePicName.textContent = file.name;

    const publicUrl = await uploadProfileImage(file);
    if (!publicUrl) {
      alert("Could not upload profile picture.");
      return;
    }

    bios[currentUser].image = publicUrl;
    const saved = await saveProfileToSupabase(currentUser);
    if (!saved) return;

    saveLocalData();
    refreshMainProfileUI();
    renderPosts();
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
  if (mentionList && !mentionList.contains(e.target) && e.target !== postText) {
    mentionList.classList.add("hidden");
  }

  if (notifModal && notifBtn && !notifModal.contains(e.target) && !notifBtn.contains(e.target)) {
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

    postBtn.disabled = true;
    postBtn.textContent = selectedMediaFile?.type.startsWith("video/")
      ? "Uploading..."
      : editingPostId
        ? "Saving..."
        : "Posting...";

    try {
      const selectedMedia = await getSelectedPostMedia();
      if (selectedMediaFile && !selectedMedia) return;

      if (editingPostId) {
        const ok = await updatePostInSupabase(editingPostId, {
          text,
          description,
          image: selectedMedia || ""
        });

        if (!ok) return;

        editingPostId = null;
        if (postBtn) postBtn.textContent = "Post";
        if (postText) postText.value = "";
        if (postDescription) postDescription.value = "";
        if (fileInput) fileInput.value = "";
        if (fileName) fileName.textContent = "No file chosen";
        selectedImageData = "";
        selectedMediaFile = null;

        await loadPostsFromSupabase();
        return;
      }

      const img = selectedMedia || "";

      const newPost = {
        username: currentUser,
        userLetter: bios[currentUser].letter || "?",
        profileImage: bios[currentUser].image || "",
        text,
        description,
        image: img,
        likes: 0,
        likedBy: [],
        comments: [],
        pinned: false,
        createdAt: Date.now()
      };

      const ok = await addPostToSupabase(newPost);
      if (!ok) return;

      const mentions = text.match(/(@[a-zA-Z0-9_]+)/g) || [];
      for (const mention of mentions) {
        if (bios[mention] && mention !== currentUser) {
          await addNotification(
            mention,
            `${currentUser} mentioned you in a post`,
            null,
            "mention"
          );
        }
      }

      saveLocalData();

      if (postText) postText.value = "";
      if (postDescription) postDescription.value = "";
      if (fileInput) fileInput.value = "";
      if (fileName) fileName.textContent = "No file chosen";
      selectedImageData = "";
      selectedMediaFile = null;
      if (mentionList) mentionList.classList.add("hidden");

      await loadPostsFromSupabase();
    } catch (error) {
      console.error("Could not post media:", error);
      alert("Could not upload that file.");
    } finally {
      postBtn.disabled = false;
      postBtn.textContent = editingPostId ? "Save Edit" : "Post";
    }
  };
}

if (saveProfileBtn) {
  saveProfileBtn.onclick = async function () {
    if (!currentUser || !bios[currentUser]) return;

    bios[currentUser].role = (editRoleInput ? editRoleInput.value.trim() : "") || "Member";
    bios[currentUser].bio = (editBioInput ? editBioInput.value.trim() : "") || "No bio yet.";
    bios[currentUser].likes = (editLikesInput ? editLikesInput.value.trim() : "") || "Cool stuff";
    bios[currentUser].tag = (editTagInput ? editTagInput.value.trim() : "") || "Dragon";

    await saveProfileToSupabase(currentUser);
    saveLocalData();
    refreshMainProfileUI();
    closeProfileEditor();
    renderPosts();
  };
}

if (sortSelect) sortSelect.onchange = renderPosts;

if (topAvatar) {
  topAvatar.onclick = function () {
    if (!currentUser) return;
    openProfileEditor();
  };
}

if (notifBtn) {
  notifBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    if (notifModal?.classList.contains("hidden")) {
      openNotifications();
    } else {
      closeNotifications();
    }
  });
}

if (closeNotifBtn) closeNotifBtn.addEventListener("click", closeNotifications);
if (clearNotificationsBtn) {
  clearNotificationsBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    clearAllNotifications();
  });
}
if (closeBioBtn) closeBioBtn.onclick = closeBio;
if (bioBackdrop) bioBackdrop.onclick = closeBio;
if (closeProfileEditorBtn) closeProfileEditorBtn.onclick = closeProfileEditor;
if (profileEditorBackdrop) profileEditorBackdrop.onclick = closeProfileEditor;
if (loginKeywordBtn) loginKeywordBtn.addEventListener("click", signInWithKeyword);

if (keywordInput) {
  keywordInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") signInWithKeyword();
  });
}

if (logoutBtn) logoutBtn.addEventListener("click", logout);
if (closePostViewBtn) closePostViewBtn.addEventListener("click", closePostView);
if (postViewBackdrop) postViewBackdrop.addEventListener("click", closePostView);
if (postViewCommentBtn) postViewCommentBtn.addEventListener("click", submitPostViewComment);

if (postViewCommentInput) {
  postViewCommentInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitPostViewComment();
    }
  });
}

if (areaSelect) {
  areaSelect.addEventListener("change", updateAreaVisibility);
}
async function loadConversations() {
  if (!currentUser) return;

  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .or(`user_a.eq.${currentUser},user_b.eq.${currentUser}`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not load conversations:", error.message);
    return;
  }

  conversations = data || [];
  renderConversationList();
}

// =========================
// App start
// =========================
async function startApp() {

  loadLocalData();
  updateAreaVisibility();

  // Instant load from the last lightweight post snapshot.
  localStorage.removeItem("dragon_posts_cache");
  localStorage.removeItem("dragon_posts_cache_v2");
  const cached = localStorage.getItem(postsCacheKey);

  if (cached) {
    try {
      posts = JSON.parse(cached);
      renderPosts();
    } catch (e) {
      console.warn("Cache parse failed");
      localStorage.removeItem(postsCacheKey);
    }
  }

  await Promise.all([
    loadProfilesFromSupabase().then(() => {
      refreshMainProfileUI();
      renderPosts();
    }),
    loadPostsFromSupabase()
  ]);

  if (currentUser && bios[currentUser]) {
    hideLoginScreen();
    refreshMainProfileUI();
    await loadConversations();
    await loadNotificationsFromSupabase();
  } else {
    currentUser = null;
    notifications = [];
    updateNotificationCount();
    showLoginScreen();

    if (keywordInput) {
      keywordInput.value = "";
      keywordInput.focus();
    }

    if (loginMessage) {
      loginMessage.textContent = "";
    }
  }

  subscribeToPostChanges();
  subscribeToProfileChanges();
  subscribeToNotificationChanges();
}
function subscribeToProfileChanges() {
  if (profilesChannel) return;

  profilesChannel = supabase
    .channel("public-profiles-live")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "profiles"
      },
      (payload) => {
        applyProfileFromSupabase(payload.new);
        saveLocalData();
        refreshMainProfileUI();
        renderPosts();
      }
    )
    .subscribe((status) => {
      console.log("Supabase profiles live status:", status);
    });
}
function subscribeToNotificationChanges() {
  if (!currentUser) return;

  supabase
    .channel("public-notifications-live-" + currentUser)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "notifications",
        filter: `target_user=eq.${currentUser}`
      },
      async () => {
        await loadNotificationsFromSupabase();
      }
    )
    .subscribe((status) => {
      console.log("Supabase notification live status:", status);
    });
}
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
          const updatedPost = posts.find((p) => String(p.id) === String(activePostId));
          if (updatedPost) {
            openPostView(updatedPost);
          }
        }

        if (activeThreadPostId && activeThreadCommentId) {
          const updatedPost = posts.find(
            (p) => String(p.id) === String(activeThreadPostId)
          );

          if (updatedPost) {
            const updatedComment = updatedPost.comments.find(
              (c) => String(c.id) === String(activeThreadCommentId)
            );

            if (updatedComment) {
              renderSingleCommentThread(updatedPost, updatedComment);
            }
          }
        }
      }
    )
    .subscribe((status) => {
      console.log("Supabase post live status:", status);
    });
}

async function getOrCreateConversation(otherUser) {
  if (!currentUser || !otherUser || currentUser === otherUser) {
    console.log("Blocked getOrCreateConversation:", {
      currentUser,
      otherUser
    });
    return null;
  }

  const [userA, userB] = [currentUser, otherUser].sort();

  console.log("Looking for conversation between:", userA, userB);

  const { data: existing, error: findError } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_a", userA)
    .eq("user_b", userB)
    .maybeSingle();

  if (findError) {
    console.error("Could not find conversation:", findError);
    alert("Find conversation failed: " + findError.message);
    return null;
  }

  if (existing) {
    console.log("Found existing conversation:", existing);
    return existing;
  }

  console.log("No conversation found. Creating one now...");

  const { data: created, error: createError } = await supabase
    .from("conversations")
    .insert({
      user_a: userA,
      user_b: userB,
      created_at: Date.now()
    })
    .select()
    .single();

  if (createError) {
    console.error("Could not create conversation:", createError);
    alert("Create conversation failed: " + createError.message);
    return null;
  }

  console.log("Created conversation:", created);
  return created;
}

function renderConversationList() {
  if (!conversationList) return;

  conversationList.innerHTML = "";

  if (conversations.length === 0) {
    const empty = document.createElement("div");
    empty.className = "comment";
    empty.textContent = "No messages yet.";
    conversationList.appendChild(empty);
    return;
  }

  conversations.forEach((conversation) => {
    const otherUser =
      conversation.user_a === currentUser
        ? conversation.user_b
        : conversation.user_a;

    const div = document.createElement("div");
    div.className =
      "conversation-item" +
      (String(conversation.id) === String(activeConversationId) ? " active" : "");
    div.textContent = otherUser;

    div.onclick = async function () {
      await openConversation(conversation.id, otherUser);
    };

    conversationList.appendChild(div);
  });
}

async function loadMessages(conversationId) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Could not load messages:", error.message);
    return [];
  }

  return data || [];
}
function renderMessages(messages) {
  if (!messagesList) return;

  messagesList.innerHTML = "";

  if (messages.length === 0) {
    const empty = document.createElement("div");
    empty.className = "comment";
    empty.textContent = "No messages yet. Start the chat!";
    messagesList.appendChild(empty);
    return;
  }

  messages.forEach((msg) => {
    const div = document.createElement("div");
    div.className =
      "message-bubble " + (msg.sender === currentUser ? "mine" : "theirs");
    div.textContent = msg.text;
    messagesList.appendChild(div);
  });

  messagesList.scrollTop = messagesList.scrollHeight;
}
async function openConversation(conversationId, otherUser) {
  activeConversationId = conversationId;
  activeConversationUser = otherUser;

  if (activeChatName) activeChatName.textContent = otherUser;

  renderConversationList();
  openMessagesModal();

  const messages = await loadMessages(conversationId);
  renderMessages(messages);

  subscribeToMessages(conversationId);
}

function subscribeToMessages(conversationId) {
  if (messagesChannel) {
    supabase.removeChannel(messagesChannel);
    messagesChannel = null;
  }

  messagesChannel = supabase
    .channel("messages-live-" + conversationId)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`
      },
      async () => {
        const messages = await loadMessages(conversationId);
        renderMessages(messages);
      }
    )
    .subscribe((status) => {
      console.log("Messages live status:", status);
    });
}
async function sendMessage() {
  if (!activeConversationId || !currentUser || !messageInput) return;

  const text = messageInput.value.trim();
  if (!text) return;

  const { error } = await supabase
    .from("messages")
    .insert({
      conversation_id: activeConversationId,
      sender: currentUser,
      text,
      created_at: Date.now(),
      read: false
    });

  if (error) {
    console.error("Could not send message:", error.message);
    alert("Could not send message.");
    return;
  }

  messageInput.value = "";
}

startApp(); 
