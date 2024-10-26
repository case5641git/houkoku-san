<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['register','login']]);
    }

    public function test(){
        Log::info('test test');
        return null;
    }

    /**
     * 新規登録処理
     * @param Request $request
     * @return RedirectResponse|JsonResponse
     */
    public function register(Request $request): RedirectResponse|JsonResponse
    {
        $credentials = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'role' => 'required',
            'department' => 'required',
        ]);
        try {
            $user = User::create($credentials);
        } catch (\Exception $e) {
            Log::info($e);
            return response()->json(['message' => 'ユーザー登録に失敗しました。'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }       
        $token = auth()->login($user);
        return $this->respondWithToken($token);
    }

    /**
     * ログイン処理
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }
        return $this->respondWithToken($token);
    }

    /**
     * 認証しているユーザーの情報を取得
     * @return JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * ログアウト処理
     * @return JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'ログアウトしました。']);
    }

    /**
     * トークンをリフレッシュ
     * @return JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * トークンを返却
     * @return JsonResponse
     */
    public function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }

}
