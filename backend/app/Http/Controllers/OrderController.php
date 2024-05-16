<?php

namespace App\Http\Controllers;

use Afosto\Acme\Client;
use App\Http\Requests\AcmeOrderGenerateRequest;

class AcmeOrderController extends Controller
{
    public function create(AcmeOrderGenerateRequest $request)
    {
        $values = $request->validated();

        /**
         * @var \Afosto\Acme\Client
         */
        $client = app(Client::class, [$values['email']]);

        /**
         * @var \Afosto\Acme\Data\Order
         */
        $order = $client->createOrder($values['domains']);

        /**
         * @var \Afosto\Acme\Data\Authorization[]
         */
        $_authorizations = $client->authorize($order);

        $authorizations = array();

        foreach ($_authorizations as $_authorization) {

            $authorization = array(
                'domain' => $_authorization->getDomain(),
                'expires' => $_authorization->getExpires(),
            );

            if ($_authorization->getHttpChallenge()) {
                $file = $_authorization->getFile();
                $authorization['challenges']['http'] = array(
                    'name' => $file->getFilename(),
                    'content' => $file->getContents(),
                );
            } else {
                $authorization['challenges']['http'] = null;
            }

            if ($_authorization->getDnsChallenge()) {
                $file = $_authorization->getFile();
                $txtRecord = $_authorization->getTxtRecord();
                $authorization['challenges']['dns'] = array(
                    'name' => $txtRecord->getName(),
                    'value' => $txtRecord->getValue(),
                );
            } else {
                $authorization['challenges']['dns'] = null;
            }

            $authorization['verified'] = null;

            array_push($authorizations, $authorization);
        }

        return response()->json(array(
            'orderId' => $order->getId(),
            'authorizations'  => $authorizations
        ));
    }
}
