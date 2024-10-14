<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use App\Models\User;

class UserController extends Controller
{
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
        ]);
        try {
            User::create($credentials);
        } catch (\Exception) {
            return response()->json(['message' => 'ユーザー登録に失敗しました。'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }        
        return response()->json(['message' => 'ユーザー登録が完了しました。'], Response::HTTP_CREATED);
    }
}
