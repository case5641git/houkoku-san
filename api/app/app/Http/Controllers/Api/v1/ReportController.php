<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use App\Service\ReportService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReportController extends Controller
{
    private $reportService;

    public function __construct(ReportService $reportService)
    {
        $this->middleware('auth:api');
        $this->reportService = $reportService;
    }
    /**
     * 管理者の場合は自分が管轄する全てのユーザーの報告書を取得
     * 一般ユーザーの場合は自分の報告書を取得
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $conditions = $request->all();
        $userId = Auth::id();
        $reports = User::find($userId)->isManager()
                    ? $this->reportService->getCrewsReportsList($userId, $conditions)
                    : $this->reportService->getOwnReportList($userId, $conditions);
        return response()->json(['reports' => $reports]);
    }
}
