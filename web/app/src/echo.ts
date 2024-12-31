import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: "9a93a529572835e2a4c4", // Pusherのキーを設定
  cluster: "ap3", // Pusherのクラスターを設定
  forceTLS: true, // HTTPSを使用
});

export default echo;
