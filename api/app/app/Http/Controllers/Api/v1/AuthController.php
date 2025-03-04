<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /**
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['register','login']]);
    }

    /**
     * 新規登録処理
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'role' => 'required',
            'department' => 'required',
        ]);
        $credentials['password'] = bcrypt($credentials['password']);
        try {
            $user = User::create($credentials);
        } catch (\Exception $e) {
            return response()->json(Response::HTTP_INTERNAL_SERVER_ERROR);
        }       
        $token = auth()->login($user);
        return $this->respondWithToken($token);
    }

    /**
     * ログイン処理
     * @return JsonResponse
     */
    public function login(): JsonResponse
    {
        $credentials = request()->validate([
            'email' => 'required|email', 
            'password' => 'required'
        ]);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(Response::HTTP_UNAUTHORIZED);
        }
        return $this->respondWithToken($token);
    }

    /**
     * ログインユーザー情報の更新
     * @param Request $request
     * @return void
     */
    public function update(Request $request)
    {
        DB::transaction(function () use ($request) {
            $user = auth()->user();
            $requestqAll = $request->all();
            $user->fill($requestqAll)->save();
        });
    }

    /**
     * ユーザー情報の削除 (退会処理)
     * @integer $userId
     */
    public function unsubscribe(int $userId)
    {
        DB::transaction(function () use ($userId) {
            $user = User::find($userId);
            $user->delete();
            // TODO 退会するときに関連する情報も削除する
        });
    }

    /**
     * 認証しているユーザーの情報を取得
     * @return JsonResponse
     */
    public function me(): JsonResponse
    {
        return response()->json(auth()->user());
    }

    /**
     * ログアウト処理
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        try {
            auth()->logout();
        } catch (\Exception $e) {
            return response()->json(['message' => 'ログアウトに失敗しました。']);
        }
    }

    /**
     * トークンをリフレッシュ
     * @return JsonResponse
     */
    public function refresh(): JsonResponse
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * トークンを返却
     * @return JsonResponse
     */
    public function respondWithToken($token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
        ]);
    }

}
