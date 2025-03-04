<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Service\UserService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    private $userService;

    /**
     * @return void
     */
    public function __construct(UserService $userService)
    {
        $this->middleware('auth:api', ['except' => ['register']]);
        $this->userService = $userService;
    }

    /**
     * 所属するユーザーの一覧を取得
     * 管理者の場合は所属するユーザーを全て取得
     * 一般ユーザーの場合は所属する部署の管理者の情報を取得
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $user = User::find(Auth::id())->toArray();
        $userRole = $user['role'];
        if ($userRole === config('const.common.ROLE.MANAGER')) {
            // 部署に所属する管理者以外全てのユーザー情報を取得
            $manager = $user;
            $crews = $this->userService->getCrews($user);
        } else {
            // 所属する部署の管理者のユーザー情報を取得
            $manager = $this->userService->getManager($user);
            $crews = $user;
        }
        return response()->json([
            'user' => $user,
            'crews' => $crews ?? [],
            'manager' => $manager ?? [],
        ]);
    }
}
