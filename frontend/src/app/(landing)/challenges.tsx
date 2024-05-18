'use client';

import React from 'react';
import { useSSLOrderStore } from './ssl-order-store';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { saveAs } from 'file-saver';
import { Http } from './common';
import { Input } from '@/components/ui/input';
import { Copy } from '@phosphor-icons/react';
import { Label } from '@/components/ui/label';

const Challenges = () => {
  const { order, request } = useSSLOrderStore();

  if (!order || !request) {
    return null;
  }

  function handleDownload(http: Http) {
    var blob = new Blob([http.content], { type: 'plain/plain;charset=utf-8' });
    saveAs(blob, http.name);
  }

  return (
    <div>
      <div className="space-y-8">
        {order?.authorizations.map(function (authorization, authorizationIndex) {
          console.log(authorization.verified);
          return (
            <Card key={authorizationIndex}>
              <CardHeader className="bg-muted px-5 py-3">
                <div className="flex justify-between">
                  <CardTitle className="text-base">{authorization.domain}</CardTitle>
                  <p className="text-sm">
                    Verified: {authorization.verified == null ? 'N/A' : `${authorization.verified}`}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div>
                    <p className="border-b mb-2">HTTP</p>
                    {authorization.challenges.http == null ? (
                      <span className="text-italics">N/A</span>
                    ) : (
                      <div className="text-md">
                        <ul className="space-y-4">
                          <li>
                            <p className="mb-2">1. Download below file(s):</p>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleDownload(authorization.challenges.http!)}
                            >
                              Download
                            </Button>
                          </li>
                          <li>
                            <p>
                              {`2. Create a folder ".well-known" in the root folder of your domain.
                              And inside the ".well-known" create another folder "acme-challenge".
                              Then upload the above file(s) inside the acme-challenge folder.`}
                            </p>
                          </li>
                          <li>
                            <p>
                              3. Click on the below link(s) and check that it opens a page with
                              random characters on your domain.
                              <br />
                              <a
                                href={`http://${authorization.domain}/.well-known/acme-challenge/${authorization.challenges.http.name}`}
                                target="_blank"
                                className="mt-2 text-sm text-blue-500 hover:text-blue-800"
                                rel="noopener noreferrer"
                              >
                                {`http://${authorization.domain}/.well-known/acme-challenge/${authorization.challenges.http.name}`}
                              </a>
                            </p>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <p className="border-b mb-2">DNS</p>
                    {authorization.challenges.dns == null ? (
                      'N/A'
                    ) : (
                      <div className="space-y-3 mt-3">
                        <div>
                          <Label className="mb-2 block" htmlFor={`dns-${authorizationIndex}`}>
                            Name
                          </Label>
                          <div className="flex w-full items-center space-x-2">
                            <Input
                              type="text"
                              placeholder=""
                              name={`dns-${authorizationIndex}`}
                              id={`dns-${authorizationIndex}`}
                              value={authorization.challenges.dns.name}
                              readOnly
                            />
                            <Button size="icon">
                              <Copy className="w-4" size="32" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="mb-2 block" htmlFor={`value-${authorizationIndex}`}>
                            Value
                          </Label>
                          <div className="flex w-full items-center space-x-2">
                            <Input
                              type="text"
                              placeholder=""
                              name={`value-${authorizationIndex}`}
                              id={`value-${authorizationIndex}`}
                              value={authorization.challenges.dns.value}
                              readOnly
                            />
                            <Button size="icon">
                              <Copy className="w-4" size="32" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Challenges;
