import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {wp, hp, stdHeight} from '../styles/helpers';
import { RFValue } from 'react-native-responsive-fontsize';

export default function TermsConditions() {
    return (
        <View>
            <View>
                <Text style={styles.header}>TERMS OF USE</Text>
                <Text style={styles.text}>Last updated 8/28/2020</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>AGREEMENT TO TERMS</Text>
                <Text style={styles.text}>
                    These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Linx LLC ("Company", “we”, “us”, or “our”), concerning your access to and use of the Linx website and products as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                </Text>
                <Text style={styles.text}>
                    Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of these Terms of Use, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Terms of Use to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site after the date such revised Terms of Use are posted.
                </Text>
                <Text style={styles.text}>
                    The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>INTELLECTUAL PROPERTY RIGHTS</Text>
                <Text style={styles.text}>
                    Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions. The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                </Text>
                <Text style={styles.text}>
                    Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>USER REPRESENTATIONS</Text>
                <Text style={styles.text}>
                    By using the Site, you represent and warrant that:  (1) you have the legal capacity and you agree to comply with these Terms of Use; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose; and (5) your use of the Site will not violate any applicable law or regulation.
                </Text>
                <Text style={styles.text}>
                    If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>ELIGIBILITY</Text>
                <View style={styles.list}>
                    <Text style={styles.text}>
                        You must be at least 18 years of age to create an account on Linx and use the Service. By creating an account and using the Service, you represent and warrant that:
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} you can form a binding contract with Linx
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} you are not a person who is barred from using the Service under the laws of the United States or any other applicable jurisdiction–meaning that you do not appear on the U.S. Treasury Department’s list of Specially Designated Nationals or face any other similar prohibition,
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} you will comply with this Agreement and all applicable local, state, national and international laws, rules and regulations, and
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} you have never been convicted of or pled no contest to a felony, a sex crime, or any crime involving violence, and that you are not required to register as a sex offender with any state, federal or local sex offender registry.
                    </Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>SAFETY</Text>
                <Text style={styles.text}>
                    Though Linx strives to encourage a respectful member experience, it is not responsible for the conduct of any member on or off of the Service. You agree to use caution in all interactions with other members, particularly if you decide to communicate off the Service or meet in person. You agree that you will not provide your financial information (for example, your credit card or bank account information), or wire or otherwise send money, to other members.
                </Text>
                <Text style={styles.text}>
                    YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER MEMBERS. YOU UNDERSTAND THAT LINX DOES NOT CONDUCT CRIMINAL BACKGROUND CHECKS ON ITS MEMBERS OR OTHERWISE INQUIRE INTO THE BACKGROUND OF ITS MEMBERS. LINX MAKES NO REPRESENTATIONS OR WARRANTIES AS TO THE CONDUCT OF MEMBERS. LINX RESERVES THE RIGHT TO CONDUCT – AND YOU AUTHORIZE LINX TO CONDUCT – ANY CRIMINAL BACKGROUND CHECK OR OTHER SCREENINGS (SUCH AS SEX OFFENDER REGISTER SEARCHES) AT ANY TIME USING AVAILABLE PUBLIC RECORDS OBTAINED BY IT OR WITH THE ASSISTANCE OF A CONSUMER REPORTING AGENCY, AND YOU AGREE THAT ANY INFORMATION YOU PROVIDE MAY BE USED FOR THAT PURPOSE.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>PROHIBITED ACTIVITIES</Text>
                <Text style={styles.text}>
                    You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                </Text>
                <View style={styles.list}>
                    <Text style={styles.text}>As a user of the Site, you agree not to:</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} use the Service for any purpose that is illegal or prohibited by this Agreement.
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} use the Service for any harmful or nefarious purpose.
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} use the Service in order to damage Linx.
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} violate our Community Guidelines
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} spam, solicit money from or defraud any members.
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} impersonate any person or entity or post any images of another person without his or her permission.
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} bully, “stalk,” intimidate, assault, harass, mistreat or defame any person.
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} post any Content that violates or infringes anyone’s rights, including rights of publicity, privacy, copyright, trademark or other intellectual property or contract right.
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} post any Content that is hate speech, threatening, sexually explicit or pornographic; incites violence; or contains nudity or graphic or gratuitous violence.
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} post any Content that promotes racism, bigotry, hatred or physical harm of any kind against any group or individual.
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} solicit passwords for any purpose, or personal identifying information for commercial or unlawful purposes from other users or disseminate another person’s personal information without his or her permission.
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} use another user’s account, share an account with another user, or maintain more than one account.
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} create another account if we have already terminated your account, unless you have our permission.
                    </Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>COMMUNITY GUIDELINES</Text>
                <View style={styles.list}>
                    <Text style={styles.text}>Nudity/Sexual Content</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} No nudity or sexually explicit content in your pictures or user profile.
                    </Text>

                    <Text style={styles.text}>Harassment</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} Do not engage, or encourage others to engage, in any targeted abuse or harassment against any other user. This includes sending any unsolicited sexual content to your matches. Reports of stalking, threats, bullying, or intimidation, are taken very seriously.
                    </Text>

                    <Text style={styles.text}>Violence and Physical Harm</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} We do not tolerate violent, graphic, or gory content on Linx, or any actions or content that advocate for or threaten violence of any sort, including threatening or promoting terrorism. Physical assault, coercion, and any acts of violence are strictly prohibited.
                    </Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} Content that advocates for or glorifies suicide or self-harm is also not allowed. In these situations, we may take a number of steps to assist the user, including reaching out with crisis resources.
                    </Text>

                    <Text style={styles.text}>Hate Speech</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} Any content that promotes, advocates for, or condones racism, bigotry, hatred, or violence against individuals or groups based on factors like (but not limited to) race, ethnicity, religious affiliation, disability, gender, age, national origin, sexual orientation, or gender identity is not allowed.
                    </Text>

                    <Text style={styles.text}>Private Information</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} Don’t publicly broadcast any private information, yours or anyone else’s. This includes social security numbers, passports, passwords, financial information or unlisted contact information, such as phone numbers, email addresses, home/work address.
                    </Text>

                    <Text style={styles.text}>Spam</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} Don't drive people to external websites via a link or otherwise.
                    </Text>

                    <Text style={styles.text}>Promotion or Solicitation</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} Soliciting other users is prohibited on Linx. Advertising event or business, non-profit, political campaign, contest, or to conduct research on Linx is not allowed, and we may delete your account.
                    </Text>

                    <Text style={styles.text}>Prostitution and Trafficking</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} Promoting or advocating for commercial sexual services, human trafficking or other non-consensual sexual acts is strictly prohibited and will result in your account being banned.
                    </Text>

                    <Text style={styles.text}>Scamming</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} There is a zero-tolerance policy on predatory behavior of any kind. Anyone attempting to get other users’ private information for fraudulent or illegal activity may be banned. Any user caught sharing their own financial account information (PayPal, Venmo, etc.) for the purpose of receiving money from other users may also be banned.
                    </Text>

                    <Text style={styles.text}>Impersonation</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} Do not impersonate, or otherwise misrepresent affiliation, connection or association with, any person or entity. This includes parody accounts.
                    </Text>

                    <Text style={styles.text}>Minors</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} You must be 18 years of age or older to use Tinder. As such, we do not allow images of unaccompanied minors. If you want to post photos of your children, please make sure that you are in the photo as well. If you see a profile that includes an unaccompanied minor, encourages harm to a minor, or depicts a minor in a sexual or suggestive way, please report it immediately.
                    </Text>

                    <Text style={styles.text}>Copyright and Trademark Infringement</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} Don't display any copyrighted or trademarked materials without permission to do so.
                    </Text>

                    <Text style={styles.text}>Illegal Usage</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} Anything that is illegal to do by law is illegal to do in Linx.
                    </Text>

                    <Text style={styles.text}>One Account Per Person</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} You can only have one Linx account per person.
                    </Text>

                    <Text style={styles.text}>Third-Party Apps</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} The use of any apps created by anyone other than Linx that claim to offer our service or unlock special Linx features is not allowed.
                    </Text>

                    <Text style={styles.text}>Account Dormancy</Text>
                    <Text style={styles.bullet}>
                        {`\u2022`} We may delete your account for inactivity if you don't log into the account at least once in 2 years.
                    </Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>USER GENERATED CONTRIBUTIONS</Text>
                <Text style={styles.text}>
                    The Site does not offer users to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Site and through third-party websites. As such, any Contributions you transmit may be treated in accordance with the Site Privacy Policy. When you create or make available any Contributions, you thereby represent and warrant that:
                </Text>
                <View style={[styles.text, styles.list]}>
                    <Text style={styles.bullet}>
                        1. The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.
                    </Text>
                    <Text style={styles.bullet}>
                        2. You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Site, and other users of the Site to use your Contributions in any manner contemplated by the Site and these Terms of Use.
                    </Text>
                    <Text style={styles.bullet}>
                        3. You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Site and these Terms of Use.
                    </Text>
                    <Text style={styles.bullet}>
                        4. Your Contributions are not false, inaccurate, or misleading.
                    </Text>
                    <Text style={styles.bullet}>
                        5. Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.
                    </Text>
                    <Text style={styles.bullet}>
                        6. Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).
                    </Text>
                    <Text style={styles.bullet}>
                        7. Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.
                    </Text>
                    <Text style={styles.bullet}>
                        8. Your Contributions do not advocate the violent overthrow of any government or incite, encourage, or threaten physical harm against another.
                    </Text>
                    <Text style={styles.bullet}>
                        9. Your Contributions do not violate any applicable law, regulation, or rule.
                    </Text>
                    <Text style={styles.bullet}>
                        10. Your Contributions do not violate the privacy or publicity rights of any third party.
                    </Text>
                    <Text style={styles.bullet}>
                        11. Your Contributions do not contain any material that solicits personal information from anyone under the age of 18 or exploits people under the age of 18 in a sexual or violent manner.
                    </Text>
                    <Text style={styles.bullet}>
                        12. Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.
                    </Text>
                    <Text style={styles.bullet}>
                        13. Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.
                    </Text>
                    <Text style={styles.bullet}>
                        14. Your Contributions do not otherwise violate, or link to material that violates, any provision of these Terms of Use, or any applicable law or regulation.
                    </Text>
                </View>
                <Text style={styles.text}>
                    Any use of the Site in violation of the foregoing violates these Terms of Use and may result in, among other things, termination or suspension of your rights to use the Site.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>CONTRIBUTION LICENSE</Text>
                <Text style={styles.text}>
                    You and the Site agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).
                </Text>
                <Text style={styles.text}>
                    By submitting suggestions or other feedback regarding the Site, you agree that we can use and share such feedback for any purpose without compensation to you.
                </Text>
                <Text style={styles.text}>
                    We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Site. You are solely responsible for your Contributions to the Site and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>SUBMISSIONS</Text>
                <Text style={styles.text}>
                    You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the Site ("Submissions") provided by you to us are non-confidential and shall become our sole property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you. You hereby waive all moral rights to any such Submissions, and you hereby warrant that any such Submissions are original with you or that you have the right to submit such Submissions. You agree there shall be no recourse against us for any alleged or actual infringement or misappropriation of any proprietary right in your Submissions.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>SITE MANAGEMENT</Text>
                <Text style={styles.text}>
                    We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>TERM AND TERMINATION</Text>
                <Text style={styles.text}>
                    These Terms of Use shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SITE OR DELETE ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
                </Text>
                <Text style={styles.text}>
                    If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>MODIFICATIONS AND INTERRUPTIONS</Text>
                <Text style={styles.text}>
                    We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
                </Text>
                <Text style={styles.text}>
                    We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Site at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Site during any downtime or discontinuance of the Site. Nothing in these Terms of Use will be construed to obligate us to maintain and support the Site or to supply any corrections, updates, or releases in connection therewith.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>GOVERNING LAW</Text>
                <Text style={styles.text}>
                    These Terms shall be governed by and defined following the laws of California. Linx and yourself irrevocably consent that the courts of California shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>DISPUTE RESOLUTION</Text>
                <Text style={styles.text}>Binding Arbitration</Text>
                <Text style={styles.text}>
                    Any dispute arising out of or in connection with this contract, including any question regarding its existence, validity or termination, shall be referred to and finally resolved by the International Commercial Arbitration Court under the European Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146) according to the Rules of this ICAC, which, as a result of referring to it, is considered as the part of this clause. The number of arbitrators shall be 30 days. The seat, or legal place, of arbitration, shall be California. The language of the proceedings shall be English. The governing law of the contract shall be the substantive law of California.
                </Text>
                <Text style={styles.text}>Restrictions</Text>
                <Text style={styles.text}>
                    The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.
                </Text>
                <Text style={styles.text}>Exceptions to Arbitration</Text>
                <Text style={styles.text}>
                    The Parties agree that the following Disputes are not subject to the above provisions concerning binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>CORRECTIONS</Text>
                <Text style={styles.text}>
                    There may be information on the Site that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Site at any time, without prior notice.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>DISCLAIMER</Text>
                <Text style={styles.text}>
                    THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE’S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SITE. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>LIMITATIONS OF LIABILITY</Text>
                <Text style={styles.text}>
                    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER OF THE AMOUNT PAID, IF ANY, BY YOU TO US. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>INDEMNIFICATION</Text>
                <Text style={styles.text}>
                    You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) use of the Site; (2) breach of these Terms of Use; (3) any breach of your representations and warranties set forth in these Terms of Use; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Site with whom you connected via the Site. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>USER DATA</Text>
                <Text style={styles.text}>
                    We will maintain certain data that you transmit to the Site for the purpose of managing the performance of the Site, as well as data relating to your use of the Site. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Site. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</Text>
                <Text style={styles.text}>
                    Visiting the Site, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SITE. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>MISCELLANEOUS</Text>
                <Text style={styles.text}>
                    These Terms of Use and any policies or operating rules posted by us on the Site or in respect to the Site constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision. These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms of Use or use of the Site. You agree that these Terms of Use will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Terms of Use and the lack of signing by the parties hereto to execute these Terms of Use.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>CONTACT US</Text>
                <Text style={styles.text}>
                    In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                </Text>
                <Text style={styles.text}>webmaster@linx-services.com</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: hp(30),
    },
    header: {
        textTransform: 'uppercase',
    },
    text: {
        marginTop: hp(15),
    },
    list: {
        flexDirection: 'column',
    },
    bullet: {
        marginLeft: wp(5),
    },
});
