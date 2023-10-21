<?php

namespace App\Http\Controllers\Bien;

use App\Http\Controllers\Controller;
use App\Http\Requests\BienFormRequest;
use App\Models\Bien;
use Illuminate\Support\Facades\Storage;

class BienController extends Controller
{

    public function index()
    {
        return Bien::query()->orderBy('updated_at', 'desc')->get();
    }

    public function store(BienFormRequest $request)
    {
        $data = $request->validated();
        if (isset($data['image']))
            $data['image'] = $data['image']->store('bien', 'public');
        Bien::create($data);
        return response()->json(
            [
                'message' => 'crée'
            ]
        );
    }

    public function show(Bien $bien)
    {
        return $bien;
    }


    public function update(BienFormRequest $request, Bien $bien)
    {
        $bien->update($this->extractData($request, $bien));
        return response([
            'message' => 'modifié '
        ]);
    }

    public function destroy(Bien $bien)
    {
        if ($bien->image)
            Storage::disk('public')->delete($bien->image);
        $bien->delete();
        return response([
            'message' => 'supprimé '
        ]);
    }

    public function extractData(BienFormRequest $request, Bien $bien)
    {
        $data = $request->validated();
        if (!isset($data['image']))
            return $data;
        if (isset($bien->image))
            Storage::disk('public')->delete($bien->image);
        $data['image'] = $data['image']->store('bien', 'public');
        return $data;
    }
}
