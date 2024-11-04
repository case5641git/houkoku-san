<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    private $reportService;

    public function __construct(Report $reportService)
    {
        $this->middleware('auth:api');
        $this->reportService = $reportService;
    }
    /**
     * 管理者の場合は自分が管轄する全てのユーザーの報告書を取得
     * 一般ユーザーの場合は自分の報告書を取得
     * @return JsonResponse
     */
    public function index()
    {
        $userId = Auth::id();
        $user = User::find($userId);
        $userRole = $user->role;
        if ($userRole === config('const.common.ROLE.MANAGER')) {
            $reports = $this->reportService->getCrewsReportsList($userId);
        } else {
            $reports = $this->reportService->getOwnReportList($userId);
        }
        return response()->json(['reports' => $reports]);
    }
}
