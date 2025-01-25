<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Service\ReportService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

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


    /**
     * 報告書の作成
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function add(Request $request): JsonResponse
    {
        Log::info($request->all());
        try {
            $reportId = $this->reportService->createReport($request->all());
            return response()->json(['message' => '報告書を作成しました。', 'reportId' => $reportId], Response::HTTP_CREATED);
        } catch (Exception $e) {
            return response()->json(['message' => '報告書の作成に失敗しました。'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 報告書の詳細を取得
     * 
     * @param int $id
     * @return JsonResponse
     */
    public function showDetail(int $id): JsonResponse
    {
        try {
            $report = $this->reportService->findById($id);
            return response()->json(['report' => $report], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['message' => '報告書の取得に失敗しました。'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 報告書の編集
     * 
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function edit(Request $request, int $id): JsonResponse
    {
        try {
            $this->reportService->editReport($request->all(), $id);
            return response()->json(['message' => '報告書を編集しました。'], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['message' => '報告書の編集に失敗しました。'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
}
