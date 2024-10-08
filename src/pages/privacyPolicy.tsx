import React from "react";
import Layout from "../components/common/Layout";

const PrivacyPolicy = () => {
    return (
        <Layout title="PrivacyPolicy">
            <div className="mx-8 md:mx-20 pt-10 text-white mt-24">
                <article className="prose prose-sm max-w-none">
                    <p>
                        <span className="font-bold">Movie Wizard</span>
                        （以下、「当方」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）におけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
                    </p>
                </article>
                <hr className="h-px my-8 bg-gray-300 border-0" />
                <article className="prose prose-sm">
                    <h3 className="font-bold">お客様から取得する情報</h3>
                    <p>当方は、お客様から以下の情報を取得します。</p>
                    <ul>
                        <li>メールアドレス</li>
                        <li>
                            外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
                        </li>
                        <li>
                            本サービスの滞在時間、入力履歴等の本サービスにおけるお客様の行動履歴
                        </li>
                        <li>
                            本サービスの起動時間、入力履歴等の本サービスの利用履歴
                        </li>
                    </ul>
                    <h3 className="font-bold">お客様の情報を利用する目的</h3>
                    <p>
                        当方は、お客様から取得した情報を、以下の目的のために利用します。
                    </p>
                    <ul>
                        <li>
                            本サービスに関する登録の受付、お客様の本人確認、認証のため
                        </li>
                        <li>お客様の本サービスの利用履歴を管理するため</li>
                        <li>
                            本サービスにおけるお客様の行動履歴を分析し、本サービスの維持改善に役立てるため
                        </li>
                        <li>本サービスに関するご案内をするため</li>
                        <li>お客様からのお問い合わせに対応するため</li>
                        <li>当方の規約や法令に違反する行為に対応するため</li>
                        <li>
                            本サービスの変更、提供中止、終了、契約解除をご連絡するため
                        </li>
                        <li>当方規約の変更等を通知するため</li>
                        <li>
                            以上の他、本サービスの提供、維持、保護及び改善のため
                        </li>
                    </ul>
                    <h3 className="font-bold">第三者提供</h3>
                    <p>
                        当方は、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
                        但し、次の場合は除きます。
                    </p>
                    <ul>
                        <li>個人データの取扱いを外部に委託する場合</li>
                        <li>当方や本サービスが買収された場合</li>
                        <li>
                            事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
                        </li>
                        <li>
                            その他、法律によって合法的に第三者提供が許されている場合
                        </li>
                    </ul>
                    <h3 className="font-bold">アクセス解析ツール</h3>
                    <p>
                        当方は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。
                        Googleアナリティクスについて、詳しくは
                        <a
                            href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                            target="_blank"
                            rel="noreferrer"
                            className="underline"
                        >
                            こちら
                        </a>
                        からご確認ください。
                    </p>
                    <h3 className="font-bold">プライバシーポリシーの変更</h3>
                    <p>
                        当方は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
                    </p>
                    <h3 className="font-bold">お問い合わせ</h3>
                    <p>
                        お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のTwitterアカウントにご連絡ください。
                    </p>
                    <span>
                        <a
                            href="https://twitter.com/ZCunkuma"
                            target="_blank"
                            rel="noreferrer"
                            className="underline"
                        >
                            Twitterアカウント
                        </a>
                    </span>
                    <br></br>
                    <p>以上</p>
                    <p>2023年06月23日 制定</p>
                </article>
            </div>
        </Layout>
    );
};

export default PrivacyPolicy;
