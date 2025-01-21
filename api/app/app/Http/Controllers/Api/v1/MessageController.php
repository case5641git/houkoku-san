<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Message;
use App\Events\MessageCreated;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    
    /**
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['register']]);
    }

    /**
     * メッセージを取得
     */
    public function showMessages(int $reportId)
    {
        $messages = Message::where('report_id', $reportId)
                            ->with('user')
                            ->get()
                            ->toArray();
        return response()->json(['messages' => $messages]);
    }

    public function sendMessage(Request $request) 
    {
        $requestAll = $request->all();
        // メッセージをデータベースに保存
        $message = Message::create([
            'user_id' => $requestAll['user_id'],
            'report_id' => $requestAll['report_id'],
            'message' => $requestAll['message'],
        ]);

        // イベントを発行（Messageモデルを渡す）
        // ブロードキャストは未実装　今後の課題として残す
        // MessageCreated::dispatch($message);

        return response()->json(['success' => true], 200);
    }
}
